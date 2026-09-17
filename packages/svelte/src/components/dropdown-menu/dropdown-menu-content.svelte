<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { DropdownMenu as BitsDropdownMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getDropdownMenuContext } from './dropdown-menu-context'
  import {
    physicalSide,
    popupClassName,
    POPUP_SCROLLER,
    type DropdownMenuAlign,
    type DropdownMenuSide,
  } from './dropdown-menu-variants'

  export type DropdownMenuContentProps = Omit<WithoutChildrenOrChild<BitsDropdownMenu.ContentProps>, 'side' | 'align'> & {
    /**
     * Preferred side to open on.
     * @default 'bottom'
     */
    side?: DropdownMenuSide
    /**
     * Alignment along that side.
     * @default 'start'
     */
    align?: DropdownMenuAlign
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
    side = 'bottom',
    align = 'start',
    sideOffset = 6,
    alignOffset = 0,
    collisionPadding = 5,
    keepMounted = false,
    container,
    portalProps,
    positionerProps,
    dir,
    onpointerenter,
    onpointerleave,
    children,
    ...rest
  }: DropdownMenuContentProps = $props()

  const ctx = getDropdownMenuContext()
  const direction = useDirection()
  const resolvedDir = $derived(dir === 'rtl' || dir === 'ltr' ? dir : direction.current)
  const resolvedSide = $derived(physicalSide(side, resolvedDir))
  const positionerClass = $derived(
    cn('isolate z-50 group/popup outline-none', positionerProps?.class as string | undefined),
  )
  const popupClasses = $derived(popupClassName(ctx.size, className))

  function handlePointerEnter(event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    onpointerenter?.(event)
    ctx.hoverEnter()
  }

  function handlePointerLeave(event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    onpointerleave?.(event)
    ctx.hoverLeave()
  }
</script>

<BitsDropdownMenu.Portal {...asBitsAttrs(portalProps ?? {})} to={container}>
  <BitsDropdownMenu.Content
    side={resolvedSide}
    {align}
    {sideOffset}
    {alignOffset}
    {collisionPadding}
    forceMount={keepMounted ? true : undefined}
    loop={true}
    trapFocus={ctx.modal}
    preventScroll={ctx.modal}
    onpointerenter={handlePointerEnter}
    onpointerleave={handlePointerLeave}
    {...asBitsAttrs(positionerProps ?? {})}
    {...asBitsAttrs(rest)}
    class={positionerClass}
    dir={resolvedDir}
  >
    <div data-slot="dropdown-menu-content" class={popupClasses}>
      <div class={POPUP_SCROLLER}>
        {@render children?.()}
      </div>
    </div>
  </BitsDropdownMenu.Content>
</BitsDropdownMenu.Portal>
