// Generates the prebuilt `appica.css` for consumers who don't use Tailwind.
//
// Path A (default) keeps source-scanning: consumers `@import` styles.css and
// add `@source` so their own Tailwind compiles the component classes. This
// script is Path B: it runs the Tailwind compiler over the token layer plus the
// compiled components (`@source './dist'`) and emits one self-contained
// stylesheet. Because styles.css maps tokens with `@theme inline` onto raw CSS
// variables (`--color-primary: var(--primary)`), every generated utility keeps
// referencing `var(--primary)` - so the design tokens stay overridable and dark
// mode still works from this prebuilt file, exactly like the source path.
//
// The output includes Tailwind's Preflight, so the file is a drop-in baseline
// for a non-Tailwind app. In an app that already runs Tailwind, use Path A
// instead to avoid shipping the reset and utilities twice.
//
// We drive Tailwind through its PostCSS plugin rather than @tailwindcss/cli so
// the build doesn't pull in @parcel/watcher (a native, watch-only dependency).
import { createRequire } from 'node:module'
import { existsSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const postcss = require('postcss')
const tailwind = require('@tailwindcss/postcss')

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(pkgRoot, 'dist')
const entryPath = join(pkgRoot, '.appica-css-entry.css')
const outPath = join(pkgRoot, 'appica.css')

if (!existsSync(distDir)) {
  console.error('[build-css] dist/ not found - run the JS build before this script.')
  process.exit(1)
}

// Temporary entry: the token layer already `@import`s tailwindcss; we only add
// the `@source` that points Tailwind at the compiled components to scan. The
// paths are relative to this file, so it must sit at the package root.
writeFileSync(entryPath, `@import './styles.css';\n@source './dist';\n`)

const banner =
  '/*! Appica UI prebuilt stylesheet - for projects without Tailwind.\n' +
  ' * Tailwind users: import styles.css + @source instead (see docs/installation).\n' +
  ' * Override design tokens by redefining the CSS variables after this file:\n' +
  ' *   :root { --primary: oklch(60% 0.25 150); }\n' +
  ' */\n'

try {
  const input = readFileSync(entryPath, 'utf8')
  const result = await postcss([tailwind({ optimize: { minify: true } })]).process(input, {
    from: entryPath,
    to: outPath,
  })
  writeFileSync(outPath, banner + result.css)
} finally {
  rmSync(entryPath, { force: true })
}

console.log(`[build-css] wrote appica.css (${(statSync(outPath).size / 1024).toFixed(1)} KB)`)
