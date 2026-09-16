<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Tooltip as BitsTooltip } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getTooltipContext, getTrackCursorVirtualRect } from './tooltip-context'

  type Side = 'top' | 'bottom' | 'left' | 'right'
  type Align = 'start' | 'center' | 'end'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Preferred side of the trigger.
     * @default 'top'
     */
    side?: Side
    /**
     * Distance from the trigger in pixels.
     */
    sideOffset?: number
    /**
     * Preferred alignment along the side.
     * @default 'center'
     */
    align?: Align
    /** Offset along the alignment axis. */
    alignOffset?: number
    /**
     * Render the pointer.
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
    /** Escape hatch forwarded to the bits-ui Portal. */
    portalProps?: Record<string, unknown>
    children?: Snippet
  }

  let {
    class: className,
    side = 'top',
    sideOffset,
    align = 'center',
    alignOffset = 0,
    arrow = true,
    keepMounted = false,
    collisionPadding = 5,
    arrowPadding = 5,
    container,
    portalProps,
    dir,
    children,
    ...rest
  }: Props = $props()

  const direction = useDirection()
  const ctx = getTooltipContext()
  const resolvedDir = $derived(dir === 'rtl' || dir === 'ltr' ? dir : direction.current)
  const resolvedOffset = $derived(sideOffset ?? (arrow ? 8 : 4))
  const tracking = $derived((ctx?.getTrackCursorAxis() ?? 'none') !== 'none')
  const cursorAnchor = {
    getBoundingClientRect: () => {
      if (!ctx) return new DOMRect()
      return getTrackCursorVirtualRect(ctx.getTrackCursorAxis(), ctx.getTriggerEl(), ctx.cursor)
    },
  }
  const portal = $derived({
    ...portalProps,
    ...(container !== undefined ? { to: container } : {}),
  })
  const classes = $derived(
    cn(
      'isolate z-50 overflow-visible bg-background-inverse text-foreground-inverse rounded-xs px-3 py-1.5 text-xs shadow-md',
      'motion-safe:origin-(--bits-tooltip-content-transform-origin) motion-safe:transition-[opacity,scale] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.175,0.885,0.32,1.5)]',
      'data-[state=closed]:motion-safe:scale-95 data-[state=closed]:motion-safe:opacity-0',
      'data-starting-style:motion-safe:scale-90 data-starting-style:motion-safe:opacity-0',
      'data-ending-style:motion-safe:scale-95 data-ending-style:motion-safe:opacity-0 data-ending-style:motion-safe:duration-100 data-ending-style:motion-safe:ease-out',
      'data-[state=instant-open]:motion-safe:transition-none',
      className,
    ),
  )
  const arrowClasses = cn(
    'bg-background-inverse fill-background-inverse size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]',
    'data-[side=top]:-bottom-2.5',
    'data-[side=bottom]:top-1',
    'data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2',
    'data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2',
    'data-[side=inline-start]:-inset-e-1 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-translate-y-1/2',
    'data-[side=inline-end]:-inset-s-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-translate-y-1/2',
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

<BitsTooltip.Portal {...asBitsAttrs(portal)}>
  <BitsTooltip.Content
    data-slot="tooltip-content"
    class={classes}
    {side}
    sideOffset={resolvedOffset}
    {align}
    {alignOffset}
    {collisionPadding}
    {arrowPadding}
    dir={resolvedDir}
    customAnchor={tracking ? cursorAnchor : undefined}
    updatePositionStrategy={tracking ? 'always' : 'optimized'}
    forceMount={keepMounted ? true : undefined}
    {...asBitsAttrs(rest)}
  >
    {@render children?.()}
    {#if arrow}
      <BitsTooltip.Arrow width={10} height={10}>
        {#snippet child({ props })}
          {@const arrowProps = props as Record<string, unknown>}
          <span
            {...asBitsAttrs(arrowProps)}
            data-slot="tooltip-arrow"
            class={arrowClasses}
            style={arrowBoxStyle(arrowProps)}
          ></span>
        {/snippet}
      </BitsTooltip.Arrow>
    {/if}
  </BitsTooltip.Content>
</BitsTooltip.Portal>
