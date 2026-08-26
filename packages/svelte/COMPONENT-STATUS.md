# `@appica/ui-svelte` component status

Checklist of every public `@appica/ui-react` export and whether the Svelte package has a counterpart. Update this file as each component lands.

Wave 1 is native HTML + shared Tailwind tokens. **bits-ui** is the Base UI analog and starts in Wave 2. Dismiss animations use `svelte/transition`, not Motion. Polymorphism is `href` / `el` - there is no public `child` snippet.

## Components

- [ ] `accordion` - Wave 2: bits-ui (React uses Base UI Accordion)
- [x] `alert` - Wave 1. Dismiss uses `svelte/transition` (`out:`), not Motion. Compound parts: Icon / Title / Description / Action. Title tag via `el`.
- [ ] `alert-dialog` - Wave 2: bits-ui
- [ ] `autocomplete` - Wave 2: bits-ui Combobox analog
- [x] `avatar` - Wave 1. Native `<img>` load/error (no Base UI). Group size/shape via context, not `cloneElement`.
- [x] `background-pattern` - Wave 1. Native CSS masks; spotlight uses `{@attach}` + WAAPI fade (persistent under `useReducedMotion`).
- [x] `badge` - Wave 1. `<span>` by default; `<a>` when `href` is set; `<button>` when `onclick` is set. No `child` snippet.
- [ ] `border-beam` - React uses Motion; Svelte port TBD (`svelte/motion` or CSS)
- [ ] `breadcrumb` - Wave 2
- [x] `button` - Wave 1. Native `<button>`, or `<a>` when `href` is set. Exports `buttonVariants` for Wave 2 triggers. Optional ButtonGroup context is a no-op until Wave 2.
- [ ] `button-group` - Wave 2
- [ ] `calendar` - Wave 2
- [x] `card` - Wave 1. Root tag via `el` (`div` / `article` / `li` / …), not `render` / `child`.
- [ ] `carousel` - Wave 2
- [ ] `checkbox` - Wave 2: bits-ui
- [ ] `checkbox-group` - Wave 2: bits-ui
- [x] `chip` - Wave 1. Reuses `buttonVariants`. Dismiss uses `svelte/transition`. Group `clearAll()` is a component export (`bind:this`).
- [ ] `collapsible` - Wave 2: bits-ui
- [ ] `color-area` - Wave 2
- [ ] `color-picker` - Wave 2
- [ ] `color-slider` - Wave 2
- [ ] `color-swatch` - Wave 2
- [ ] `color-swatch-picker` - Wave 2
- [ ] `combobox` - Wave 2: bits-ui
- [ ] `context-menu` - Wave 2: bits-ui
- [x] `copy-button` - Wave 1. Uses `buttonVariants`. `value` is a string, HTMLElement (`bind:this`), or getter. `label` / `copiedLabel` drive aria-label; children do not swap.
- [x] `countdown` - Wave 1. Timer + context. Digit roll is CSS `translateY`, not Motion. Children snippet receives `parts`.
- [ ] `date-field` - Wave 2
- [ ] `date-picker` - Wave 2: bits-ui
- [ ] `dialog` - Wave 2: bits-ui. Triggers take `class={buttonVariants(...)}` directly (no wrapping Button through a `child` snippet).
- [ ] `drawer` - Wave 2: bits-ui
- [ ] `dropdown-menu` - Wave 2: bits-ui
- [ ] `field` - Wave 2: bits-ui (Input/Textarea skip Field context until then)
- [x] `fieldset` - Wave 1. Native `<fieldset>` / `<legend>` (no bits-ui). `disabled` disables descendant controls.
- [ ] `form`
- [x] `gradient-glow` - Wave 1. Uses shared `animate-gradient-glow` utilities in `styles.css`.
- [x] `input` - Wave 1. `bind:value`, `clearable`, `start` / `end` snippets. No Field context yet.
- [x] `kbd` - Wave 1. Size via context on `KbdGroup`.
- [x] `loader` - Wave 1. Bar / dots as CSS `@keyframes`, gated by `useReducedMotion` (no Motion).
- [ ] `menubar` - Wave 2: bits-ui
- [x] `meter` - Wave 1. Native ARIA `role="meter"` (no bits-ui). Threshold status classes on the indicator.
- [ ] `navigation`
- [ ] `navigation-menu` - Wave 2: bits-ui
- [ ] `number-field` - Wave 2
- [ ] `otp-field` - Wave 2
- [x] `pagination` - Wave 1. `el` on `PaginationLink` (`a` / `button`). Links use `buttonVariants` via context.
- [ ] `popover` - Wave 2: bits-ui
- [ ] `preview-card` - Wave 2: bits-ui
- [x] `progress` - Wave 1. Native ARIA `role="progressbar"` (no bits-ui). Bar and circular variants.
- [ ] `radio` - Wave 2: bits-ui
- [ ] `radio-group` - Wave 2: bits-ui
- [ ] `rating`
- [ ] `scroll-area` - Wave 2
- [ ] `select` - Wave 2: bits-ui
- [x] `separator` - Wave 1. SVG decorative variants (dotted / wave / zigzag) ported as-is.
- [x] `skeleton` - Wave 1. Same `shimmer` / `pulse` / `none` classes as React.
- [ ] `slider` - Wave 2: bits-ui
- [ ] `sparkline`
- [x] `spinner` - Wave 1. Circular / dots / sparkle as CSS `@keyframes`, gated by `useReducedMotion`.
- [ ] `switch` - Wave 2: bits-ui
- [x] `table` - Wave 1. Native table parts. `highlighted` on `TableRow`.
- [ ] `tabs` - Wave 2: bits-ui
- [ ] `text-animate` - React uses Motion; Svelte port TBD
- [x] `textarea` - Wave 1. Same patterns as Input (`bind:value`, `clearable`, `start` / `end`).
- [x] `thumbnail` - Wave 1. Image vs icon variants; same size/shape scale as Avatar.
- [ ] `time-field` - Wave 2
- [ ] `toast` - Wave 2
- [ ] `toc`
- [ ] `toggle` - Wave 2: bits-ui
- [ ] `toggle-group` - Wave 2: bits-ui
- [ ] `toolbar` - Wave 2
- [ ] `tooltip` - Wave 2: bits-ui

## Lib

- [ ] `color` - shared color model; port when color components land

## Hooks

- [ ] `use-direction` - with DirectionProvider
- [x] `use-dismissible` - shipped with Wave 1 (Alert persistKey)
- [x] `use-local-storage` - shipped with Wave 1 (ThemeProvider)
- [x] `use-media-query` - Wave 1. Wraps `MediaQuery` from `svelte/reactivity` (read `.current`)
- [x] `use-reduced-motion` - Wave 1. Read `.current`
- [x] `use-theme` - Wave 1

## Providers

- [ ] `direction-provider`
- [x] `reduced-motion-provider` - Wave 1. Sets `data-disable-animations` on `<html>`
- [x] `theme-provider` - Wave 1. Same `localStorage` key and inline no-flash script as React
