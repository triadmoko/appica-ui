<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Menubar as BitsMenubar } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getMenubarContext } from './menubar-context'
  import {
    physicalSide,
    popupClassName,
    POPUP_SCROLLER,
    type MenubarAlign,
    type MenubarSide,
  } from './menubar-variants'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Preferred side to open on. Vertical bars default to `inline-end`.
     * @default 'bottom'
     */
    side?: MenubarSide
    /**
     * Alignment along that side.
     * @default 'start'
     */
    align?: MenubarAlign
    /**
     * Gap between the trigger and the popup.
     * @default 6
     */
    sideOffset?: number
    /**
     * Shift along the alignment axis.
     * @default 0
     */
    alignOffset?: number
    /**
     * Minimum gap kept from the viewport edge when flipping/shifting.
     * @default 5
     */
    collisionPadding?: number
    /**
     * Keep the content mounted while closed so enter/exit animations can run.
     * @default false
     */
    keepMounted?: boolean
    /**
     * Portal target. Maps to bits-ui Portal `to`.
     * @default document.body
     */
    container?: Element | string
    /** Escape hatch for the portal element (`style`, `disabled`, …). */
    portalProps?: Record<string, unknown>
    /** Escape hatch for the positioner element (`style`, `dir`, …). */
    positionerProps?: Record<string, unknown>
    children?: Snippet
  }

  let {
    class: className,
    side,
    align = 'start',
    sideOffset = 6,
    alignOffset = 0,
    collisionPadding = 5,
    keepMounted = false,
    container,
    portalProps,
    positionerProps,
    dir,
    children,
    ...rest
  }: Props = $props()

  const ctx = getMenubarContext()
  const direction = useDirection()
  const resolvedDir = $derived(dir === 'rtl' || dir === 'ltr' ? dir : direction.current)
  const resolvedSide = $derived(
    physicalSide(side ?? (ctx.orientation === 'vertical' ? 'inline-end' : 'bottom'), resolvedDir),
  )
  const positionerClass = $derived(
    cn('isolate z-50 group/popup outline-none', positionerProps?.class as string | undefined),
  )
  const popupClasses = $derived(popupClassName(ctx.size, className))
</script>

<BitsMenubar.Portal {...asBitsAttrs(portalProps ?? {})} to={container}>
  <BitsMenubar.Content
    side={resolvedSide}
    {align}
    {sideOffset}
    {alignOffset}
    {collisionPadding}
    forceMount={keepMounted ? true : undefined}
    loop={true}
    trapFocus={ctx.modal}
    preventScroll={ctx.modal}
    {...asBitsAttrs(positionerProps ?? {})}
    {...asBitsAttrs(rest)}
    class={positionerClass}
    dir={resolvedDir}
  >
    <div data-slot="menubar-content" class={popupClasses}>
      <div class={POPUP_SCROLLER}>
        {@render children?.()}
      </div>
    </div>
  </BitsMenubar.Content>
</BitsMenubar.Portal>
