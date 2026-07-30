# `@appica/ui-react-native` component agent guide

This package is a React Native / Expo component library — the mobile counterpart of
[`@appica/ui-react`](../react/AGENTS.md), sharing its component/variant/export conventions
where they translate, and diverging where the platform requires it. Read this file before
building, editing, or refactoring a component here.

## Stack pin

- React `^19.0.0`, React Native `>=0.74.0`, targeting Expo SDK 57 (RN 0.82) for the playground.
- TypeScript 6 (`ignoreDeprecations: "6.0"` required in `tsconfig.json`, same as `packages/react`).
- Test stack: `jest-expo` + `@testing-library/react-native` — **not** vitest. Vitest has no
  first-class support for Metro's module resolution or RN native-module mocking; `jest-expo` is
  Expo's official preset and is a superset that also covers pure-core-RN components like this one.

## Differences from `@appica/ui-react`

- **No Base UI.** There's no RN equivalent — wrap RN's own primitives (`Pressable`, `View`,
  `Text`, `TextInput`) directly. Hand-rolling interaction/accessibility behavior here is the
  correct default, not a shortcut.
- **No DOM/ARIA.** Use `accessibilityRole` / `accessibilityLabel` / `accessibilityState` instead
  of ARIA attributes. There's no `vitest-axe` equivalent — accessibility is verified via RNTL
  role/state assertions (`getByRole('button')`, `toHaveAccessibilityState({ disabled: true })`),
  not an automated a11y scanner.
- **No `'use client'`.** RN/Metro has no RSC boundary; the directive is meaningless here and
  must not be added.
- **No Tailwind / NativeWind (for now).** NativeWind v4 (the stable release) only supports
  Tailwind v3, while `packages/react` is on Tailwind v4 — pulling NativeWind in today would mean
  running two incompatible Tailwind majors side by side. Styling instead uses RN's built-in
  `StyleSheet.create` plus the token module in [src/tokens.ts](src/tokens.ts), which mirrors the
  subset of `packages/react/styles.css`'s CSS-variable tokens that shipped components actually
  consume, converted from OKLCH to hex. This is a deliberate phase-1 decision, not a permanent
  one — revisit once NativeWind v5 / Tailwind v4 support is production-ready. When that happens,
  only `*-variants.ts` internals change; component prop APIs should stay stable.
- **No `cn()` / `clsx` / `tailwind-merge`.** RN styling is style objects, not class strings.
  Compose styles as an **array**, ordered so later entries win (RN merges style arrays shallowly
  left-to-right) — this is the direct RN analog of `cn()`'s "consumer prop wins last":
  `style={[sizeStyles[size], variantStyles[variant], pressed && pressedOverlay[variant], disabled && disabledStyle, style]}`.
- **No hover states.** RN has no `hover:`; use `Pressable`'s `pressed` render-callback state for
  interaction feedback instead of `hover:`/`active:` Tailwind variants.

## Component conventions (mirrored from `packages/react` where applicable)

- **Folder layout:** `src/components/<name>/` containing `<name>.tsx`, `<name>.test.tsx`, and
  `<name>-variants.ts` (style-map "variants" file, RN's analog of a `cva` file). Add `index.ts`
  only when the folder needs to expose more than one module (e.g. `button/` exports both
  `button.tsx` and `button-variants.ts`).
- **Variant/size maps:** `Record<Variant, ViewStyle>` / `Record<Variant, TextStyle>` constants
  built with `StyleSheet.create`, declared outside the component, indexed by prop value — same
  rule as `packages/react`, RN-typed instead of `cva`-typed. Read color values from
  [src/tokens.ts](src/tokens.ts) rather than hardcoding hex.
- **Theme access:** components that need color tokens call `useTheme()` from
  [src/hooks/use-theme.ts](src/hooks/use-theme.ts), which resolves `{ colorScheme, tokens }` from
  [src/providers/theme-provider](src/providers/theme-provider/theme-provider.tsx). The provider is
  intentionally minimal for now (no persistence, no forced-theme override, no AsyncStorage) — it
  wraps RN's `useColorScheme()`. A fuller-featured provider is future work, only build it out when
  a component actually needs the extra surface.
- **Exports — minimal surface:** only export the component(s) and their `*Props` types, plus any
  variant maps deliberately meant for reuse (mirrors `packages/react`'s rule, e.g. `buttonVariants`
  equivalents stay unexported unless there's a documented reason).
- **Exports — wiring:** don't hand-edit `src/index.ts` or `package.json#exports`. Run
  `pnpm sync-exports` (also runs on `prebuild`/`prepack`). The script in
  [scripts/sync-exports.mjs](scripts/sync-exports.mjs) is copied verbatim from
  `packages/react/scripts/sync-exports.mjs` — it's filesystem-shape-driven and has no
  React/Tailwind-specific logic, so it needed zero changes to work here. If a third framework
  package lands, hoist this to a shared root-level script instead of copying it a third time.

## Tests

- Co-locate `<name>.test.tsx` next to the component.
- Use `@testing-library/react-native` (`render`, `fireEvent`) for interaction — not
  `react-test-renderer` (unsupported on React 19+).
- Test the public API (props, accessibility role/state, press behavior) — not internal style
  object identity.

## Build / verify

Run from the repo root or this package:

- `pnpm --filter @appica/ui-react-native test` — jest
- `pnpm --filter @appica/ui-react-native build` — tsc + rollup, produces `dist/`
- `pnpm --filter @appica/ui-react-native typecheck` — `tsc --noEmit`

A component task is not done until tests pass and the build emits the new component's ESM-only
`.js` + `.d.ts` correctly.
