/**
 * Finds props that a component accepts but silently swallows.
 *
 * Every wrapper destructures the props it handles itself and forwards the rest
 * with `{...props}`. A prop that is destructured out of that rest object but
 * then never referenced in the body never reaches the underlying element - the
 * public type still advertises it, so it looks supported and isn't.
 *
 * Usage: node scripts/check-passthrough.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const SRC = path.resolve(import.meta.dirname, '../src')

function collect(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) collect(full, out)
    else if (/\.tsx?$/.test(name) && !/\.test\.tsx?$|\.d\.ts$/.test(name)) out.push(full)
  }
  return out
}

const findings = []

for (const file of collect(SRC)) {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)

  const visit = (node) => {
    const isComponent =
      (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) &&
      node.parameters.length === 1 &&
      node.parameters[0].name &&
      ts.isObjectBindingPattern(node.parameters[0].name) &&
      node.body

    if (isComponent) {
      const binding = node.parameters[0].name
      const hasRest = binding.elements.some((el) => el.dotDotDotToken)

      // Without a rest element there's no "forward the remainder" contract, so
      // nothing is being dropped - the component owns its whole surface.
      if (hasRest) {
        const declared = binding.elements
          .filter((el) => !el.dotDotDotToken && ts.isIdentifier(el.name))
          .map((el) => ({ name: el.name.text, hasDefault: Boolean(el.initializer) }))

        const used = new Set()
        const walk = (n) => {
          if (ts.isIdentifier(n) && n.parent !== binding) used.add(n.text)
          ts.forEachChild(n, walk)
        }
        ts.forEachChild(node.body, walk)

        const dropped = declared.filter((d) => !used.has(d.name))
        if (dropped.length) {
          const name = ts.isFunctionDeclaration(node) ? node.name?.text : node.parent?.name?.text
          const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
          findings.push({
            file: path.relative(path.dirname(SRC), file),
            line,
            component: name ?? '(anonymous)',
            dropped: dropped.map((d) => d.name),
          })
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  ts.forEachChild(source, visit)
}

if (!findings.length) {
  console.log('✓ every destructured prop is either used or forwarded')
} else {
  console.log(`${findings.length} component(s) drop a prop they accept:\n`)
  for (const f of findings) console.log(`  ${f.file}:${f.line}  ${f.component} → ${f.dropped.join(', ')}`)
  process.exitCode = 1
}
