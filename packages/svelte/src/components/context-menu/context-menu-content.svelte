<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { ContextMenu as BitsContextMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getContextMenuContext } from './context-menu-context'
  import {
    physicalSide,
    popupClassName,
    POPUP_SCROLLER,
    type ContextMenuAlign,
    type ContextMenuSide,
  } from './context-menu-variants'

  export type ContextMenuContentProps = Omit<WithoutChildrenOrChild<BitsContextMenu.ContentProps>, 'side' | 'align'> & {
    /**
     * Preferred side to grow toward from the pointer.
     * @default 'bottom'
     */
    side?: ContextMenuSide
    /**
     * Alignment along that side.
     * @default 'start'
     */
    align?: ContextMenuAlign
    /**
     * Gap between the pointer and the popup.
     * @default 2
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
    side = 'bottom',
    align = 'start',
    sideOffset = 2,
    alignOffset = 0,
    collisionPadding = 5,
    keepMounted = false,
    container,
    portalProps,
    positionerProps,
    dir,
    children,
    ...rest
  }: ContextMenuContentProps = $props()

  const ctx = getContextMenuContext()
  const direction = useDirection()
  const resolvedDir = $derived(dir === 'rtl' || dir === 'ltr' ? dir : direction.current)
  const resolvedSide = $derived(physicalSide(side, resolvedDir))
  const positionerClass = $derived(
    cn('isolate z-50 group/popup outline-none', positionerProps?.class as string | undefined),
  )
  const popupClasses = $derived(popupClassName(ctx.size, className))
</script>

<BitsContextMenu.Portal {...asBitsAttrs(portalProps ?? {})} to={container}>
  <BitsContextMenu.Content
    side={resolvedSide}
    {align}
    {sideOffset}
    {alignOffset}
    {collisionPadding}
    forceMount={keepMounted ? true : undefined}
    loop={true}
    {...asBitsAttrs(positionerProps ?? {})}
    {...asBitsAttrs(rest)}
    class={positionerClass}
    dir={resolvedDir}
  >
    <div data-slot="context-menu-content" class={popupClasses}>
      <div class={POPUP_SCROLLER}>
        {@render children?.()}
      </div>
    </div>
  </BitsContextMenu.Content>
</BitsContextMenu.Portal>
