<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { LinkPreview as BitsLinkPreview } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { asBitsAttrs, cn } from '../../internal/utils'

  type Side = 'top' | 'bottom' | 'left' | 'right'
  type Align = 'start' | 'center' | 'end'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Preferred side of the trigger.
     * @default 'bottom'
     */
    side?: Side
    /**
     * Distance from the trigger in pixels.
     * @default 10 with an arrow, 6 without
     */
    sideOffset?: number
    /**
     * Preferred alignment along the side.
     * @default 'center'
     */
    align?: Align
    /**
     * Offset along the alignment axis.
     * @default 0
     */
    alignOffset?: number
    /**
     * Render the pointer and the thicker anchored border.
     * @default true
     */
    arrow?: boolean
    /**
     * Keep the content mounted while closed so enter/exit animations can run.
     * @default false
     */
    keepMounted?: boolean
    /**
     * Minimum gap kept from the viewport edge when flipping/shifting.
     * @default 5
     */
    collisionPadding?: number
    /**
     * Minimum gap between the arrow and the popup's corners.
     * @default 5
     */
    arrowPadding?: number
    /**
     * Portal target. Maps to bits-ui Portal `to`.
     * @default document.body
     */
    container?: Element | string
    /** Escape hatch for the portal element (`style`, `disabled`, …). */
    portalProps?: Record<string, unknown>
    /** Escape hatch for the positioner element (`style`, `dir`, …). */
    positionerProps?: Record<string, unknown>
    /** Anchor against a different element than the trigger. */
    anchor?: string | HTMLElement | null
    children?: Snippet
  }

  let {
    class: className,
    side = 'bottom',
    sideOffset,
    align = 'center',
    alignOffset = 0,
    arrow = true,
    keepMounted = false,
    collisionPadding = 5,
    arrowPadding = 5,
    container,
    portalProps,
    positionerProps,
    anchor,
    dir,
    children,
    ...rest
  }: Props = $props()

  const direction = useDirection()
  const resolvedDir = $derived(dir === 'rtl' || dir === 'ltr' ? dir : direction.current)
  const resolvedOffset = $derived(sideOffset ?? (arrow ? 10 : 6))
  const positionerClass = $derived(
    cn('isolate z-50 group/popup outline-none', positionerProps?.class as string | undefined),
  )
  const cardClasses = $derived(
    cn(
      'bg-background border-border-overlay flex max-w-80 min-w-50 flex-col gap-2 rounded-xl border p-4 shadow-2xl',
      arrow && [
        'group-data-[side=top]/popup:border-b-2',
        'group-data-[side=bottom]/popup:border-t-2',
        'group-data-[side=left]/popup:border-r-2',
        'group-data-[side=right]/popup:border-l-2',
        'group-data-[side=inline-start]/popup:border-e-2',
        'group-data-[side=inline-end]/popup:border-s-2',
      ],
      'motion-safe:origin-(--bits-link-preview-content-transform-origin) motion-safe:transition-[opacity,scale] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.175,0.885,0.32,1.5)]',
      'group-data-starting-style/popup:motion-safe:scale-90 group-data-starting-style/popup:motion-safe:opacity-0',
      'group-data-ending-style/popup:motion-safe:scale-95 group-data-ending-style/popup:motion-safe:opacity-0 group-data-ending-style/popup:motion-safe:duration-100 group-data-ending-style/popup:motion-safe:ease-out',
      'data-[state=closed]:motion-safe:scale-95 data-[state=closed]:motion-safe:opacity-0',
      className,
    ),
  )
  const arrowClasses = cn(
    'flex',
    'data-[side=top]:-bottom-2.25 data-[side=top]:rotate-180',
    'data-[side=bottom]:-top-2.25',
    'data-[side=left]:-right-3.25 data-[side=left]:rotate-90',
    'data-[side=right]:-left-3.25 data-[side=right]:-rotate-90',
    'data-[side=inline-start]:-inset-e-3.25 data-[side=inline-start]:ltr:rotate-90 data-[side=inline-start]:rtl:-rotate-90',
    'data-[side=inline-end]:-inset-s-3.25 data-[side=inline-end]:ltr:-rotate-90 data-[side=inline-end]:rtl:rotate-90',
  )

  function bitsStyleValue(style: unknown, key: string): string | undefined {
    if (typeof style === 'string') {
      const match = style.match(new RegExp(`(?:^|;\\s*)${key}\\s*:\\s*([^;]+)`, 'i'))
      const value = match?.[1]?.trim()
      return value && value !== 'undefined' ? value : undefined
    }
    if (style && typeof style === 'object' && key in style) {
      const value = (style as Record<string, unknown>)[key]
      return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined
    }
    return undefined
  }

  function arrowBoxStyle(props: Record<string, unknown>): string {
    const placed = String(props['data-side'] ?? '')
    const style = props.style
    const parts = ['position: absolute']
    if (placed === 'top' || placed === 'bottom') {
      const left = bitsStyleValue(style, 'left')
      if (left) parts.push(`left: ${left}`)
    }
    if (placed === 'left' || placed === 'right') {
      const top = bitsStyleValue(style, 'top')
      if (top) parts.push(`top: ${top}`)
    }
    const visibility = bitsStyleValue(style, 'visibility')
    if (visibility) parts.push(`visibility: ${visibility}`)
    return parts.join('; ')
  }
</script>

<BitsLinkPreview.Portal {...asBitsAttrs(portalProps ?? {})} to={container}>
  <BitsLinkPreview.Content
    {side}
    sideOffset={resolvedOffset}
    {align}
    {alignOffset}
    customAnchor={anchor}
    {collisionPadding}
    {arrowPadding}
    forceMount={keepMounted ? true : undefined}
    {...asBitsAttrs(positionerProps ?? {})}
    {...asBitsAttrs(rest)}
    class={positionerClass}
    dir={resolvedDir}
  >
    <div data-slot="preview-card-content" class={cardClasses}>
      {@render children?.()}
    </div>
    {#if arrow}
      <BitsLinkPreview.Arrow width={26} height={18}>
        {#snippet child({ props })}
          {@const arrowProps = props as Record<string, unknown>}
          <span
            {...asBitsAttrs(arrowProps)}
            data-slot="preview-card-arrow"
            class={arrowClasses}
            style={arrowBoxStyle(arrowProps)}
          >
            <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
              <path
                class="text-border-overlay"
                d="M21 9L15.9819 3.36153C14.3897 1.57244 11.5927 1.57413 10.0026 3.36516L5 9"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                class="text-background"
                d="M9.82943 4.57564C11.4308 2.51078 14.5497 2.51076 16.1511 4.5756L20.9774 10.7986C23.0157 13.4269 21.1426 17.25 17.8166 17.25L8.16409 17.25C4.83808 17.25 2.96496 13.4269 5.00325 10.7987L9.82943 4.57564Z"
                fill="currentColor"
              />
            </svg>
          </span>
        {/snippet}
      </BitsLinkPreview.Arrow>
    {/if}
  </BitsLinkPreview.Content>
</BitsLinkPreview.Portal>
