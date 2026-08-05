/**
 * Seeds prop JSDoc in the component sources from the docs-site API reference.
 *
 * The published prop tables are hand-written, reviewed prose - better copy than
 * anything regenerated from scratch - so the first pass of source comments is
 * lifted from them verbatim. From then on the flow reverses: JSDoc is the source
 * of truth and `generate-api-reference.mjs` in appica-dev writes the tables.
 *
 * Only props the component **declares** are touched. Props inherited through
 * `extends` (DOM attributes, Base UI root props) are skipped - they're already
 * documented upstream and stay owned by the docs sidecars.
 *
 * Usage:
 *   node scripts/apply-prop-docs.mjs [path-to-api-reference-dir] [--dry]
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const PKG = path.resolve(import.meta.dirname, '..')
const SRC = path.join(PKG, 'src')
const arg = process.argv[2]?.startsWith('--') ? null : process.argv[2]
const SIDECARS = arg ? path.resolve(arg) : path.resolve(PKG, '../../../appica-dev/api-reference/react')
const dry = process.argv.includes('--dry')

const PRINT_WIDTH = 120

/** Mirrors the docs-side cell → plain-text unwrapping so inserted text matches the table exactly. */
const cellText = (cell) =>
  cell
    .replace(/<Code[^>]*>/g, '')
    .replace(/<\/Code>/g, '')
    .replace(/\\\|/g, '|')
    .replace(/^`|`$/g, '')
    .trim()

const columnLabel = (cell) => cell.replace(/<\/?ColMinWidth[^>]*>/g, '').trim()
const pascal = (id) => id.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())

/** Mirrors the docs-side section → declaration-suffix mapping. */
const SECTION_SUFFIX = { Props: 'Props', 'Return value': 'Return', Signature: 'Options', Options: 'Options' }
const KEY_COLUMNS = new Set(['Prop', 'Property', 'Parameter', 'Field', 'Option'])

/** Maps a table's columns to roles, or `null` when it isn't a documented API table. */
function columnRoles(columns) {
  const labels = columns.map(columnLabel)
  const description = labels.indexOf('Description')
  if (description === -1 || !KEY_COLUMNS.has(labels[0])) return null
  return { key: 0, default: labels.indexOf('Default'), description }
}

function collectSidecars(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) collectSidecars(full, out)
    else if (name.endsWith('.json')) out.push(full)
  }
  return out
}

function collectSources(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) collectSources(full, out)
    else if (/\.tsx?$/.test(name) && !/\.test\.tsx?$|\.d\.ts$/.test(name)) out.push(full)
  }
  return out
}

/** Wraps a JSDoc body to the project's print width, accounting for the ` * ` gutter. */
function wrap(text, indent) {
  const limit = PRINT_WIDTH - indent.length - 3
  const lines = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    if (line && `${line} ${word}`.length > limit) {
      lines.push(line)
      line = word
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) lines.push(line)
  return lines
}

function buildComment(description, defaultValue, indent) {
  const single = `${indent}/** ${description} */`
  if (!defaultValue && single.length <= PRINT_WIDTH && !description.includes('\n')) return [single]

  const body = wrap(description, indent).map((l) => `${indent} * ${l}`)
  if (defaultValue) body.push(`${indent} * @default ${defaultValue}`)
  return [`${indent}/**`, ...body, `${indent} */`]
}

// ── Index every `*Props` interface across the source tree ──────────────────
const declarations = new Map() // interface name → { file, props: Map<name, PropertySignature> }

const DOCUMENTABLE = /(Props|Return|Options)$/

/** Same shape-walking as the docs-side extractor: interfaces, intersections, and local aliases. */
function collectMembers(typeNode, locals, seen) {
  if (!typeNode) return []
  if (ts.isTypeLiteralNode(typeNode)) return [...typeNode.members]
  if (ts.isParenthesizedTypeNode(typeNode)) return collectMembers(typeNode.type, locals, seen)
  if (ts.isIntersectionTypeNode(typeNode) || ts.isUnionTypeNode(typeNode)) {
    return typeNode.types.flatMap((t) => collectMembers(t, locals, seen))
  }
  if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName) && !typeNode.typeArguments) {
    const name = typeNode.typeName.text
    if (seen.has(name)) return []
    seen.add(name)
    return locals.has(name) ? membersOf(locals.get(name), locals, seen) : []
  }
  return []
}

function membersOf(node, locals, seen = new Set()) {
  if (ts.isInterfaceDeclaration(node)) {
    const inherited = (node.heritageClauses ?? [])
      .flatMap((c) => c.types)
      .flatMap((e) =>
        ts.isIdentifier(e.expression) && !e.typeArguments && locals.has(e.expression.text)
          ? membersOf(locals.get(e.expression.text), locals, seen)
          : [],
      )
    return [...inherited, ...node.members]
  }
  if (ts.isTypeAliasDeclaration(node)) return collectMembers(node.type, locals, seen)
  return []
}

for (const file of collectSources(SRC)) {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)

  const locals = new Map()
  ts.forEachChild(source, (node) => {
    if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name) {
      locals.set(node.name.text, node)
    }
  })

  for (const [name, node] of locals) {
    if (!DOCUMENTABLE.test(name)) continue
    const props = new Map()
    for (const member of membersOf(node, locals)) {
      if (ts.isPropertySignature(member) && member.name) props.set(member.name.text, member)
    }
    if (props.size) declarations.set(name, { file, source, props })
  }
}

// ── Collect insertions from the sidecars ───────────────────────────────────
const edits = new Map() // file → [{ pos, lines }]
let inserted = 0
let skippedDocumented = 0

for (const file of collectSidecars(SIDECARS)) {
  const sidecar = JSON.parse(readFileSync(file, 'utf8'))

  for (const table of sidecar.tables) {
    const roles = columnRoles(table.columns)
    if (!roles) continue

    // Mirrors declarationFor() on the docs side: explicit `type` wins, then a
    // heading binds only to its own part, then headless tables use the section.
    const name =
      table.type ??
      (table.heading
        ? `${table.heading.replace(/[`\s]/g, '')}Props`
        : `${pascal(sidecar.component)}${SECTION_SUFFIX[table.section] ?? 'Props'}`)
    const decl = declarations.get(name)
    if (!decl) continue

    for (const row of table.rows) {
      const member = decl.props.get(cellText(row[roles.key]))
      if (!member) continue
      if (ts.getJSDocCommentsAndTags(member).length) {
        skippedDocumented++
        continue
      }

      const description = row[roles.description].trim()
      // `{'…'}` is an MDX escape for literal braces; it can't round-trip through
      // JSDoc, so those cells stay owned by the sidecar.
      if (!description || /\{'/.test(description)) continue

      const defaultValue = roles.default === -1 || row[roles.default] === '-' ? null : cellText(row[roles.default])
      const start = member.getStart(decl.source)
      const lineStart = decl.source.getLineStarts().findLast((p) => p <= start)
      const indent = decl.source.text.slice(lineStart, start)
      if (indent.trim()) continue // not at the start of its own line - skip rather than mangle

      if (!edits.has(decl.file)) edits.set(decl.file, [])
      edits.get(decl.file).push({ pos: lineStart, lines: buildComment(description, defaultValue, indent) })
      inserted++
    }
  }
}

// ── Apply, bottom-up so earlier offsets stay valid ─────────────────────────
for (const [file, list] of edits) {
  let text = readFileSync(file, 'utf8')
  for (const edit of list.sort((a, b) => b.pos - a.pos)) {
    text = `${text.slice(0, edit.pos)}${edit.lines.join('\n')}\n${text.slice(edit.pos)}`
  }
  if (!dry) writeFileSync(file, text)
}

console.log(
  `${dry ? '[dry] ' : ''}inserted ${inserted} prop comment(s) across ${edits.size} file(s)` +
    ` · skipped ${skippedDocumented} already documented`,
)
