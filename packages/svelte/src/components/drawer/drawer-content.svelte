<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Dialog as BitsDialog } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { splitModalProps } from '../../internal/modal'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { buttonVariants } from '../button/button-variants'
  import { requireDrawerContext } from './drawer-context'
  import { attachDrawerGesture, SIDE_TO_SWIPE } from './drawer-gesture'
  import {
    CONTENT_RECLAIM_SIDE,
    FRAME_PAD_SIDE,
    HANDLE_SIDE,
    POPUP_SIDE,
    POPUP_SNAP_SIDE,
    SHADOW_SIDE,
    STACK_VARS,
    VIEWPORT_SIDE,
  } from './drawer-variants'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Render the × button in the corner.
     * @default true
     */
    closeButton?: boolean
    /**
     * Accessible label for the close button.
     * @default 'Close'
     */
    closeLabel?: string
    /** Render the dimmed backdrop. Defaults to `true` at the top level, off when nested. */
    backdrop?: boolean
    /**
     * Wrap the panel in a translucent glass frame. Turned off, the drawer is a plain solid
     * card and the handle sits inside it, the way a nested drawer looks. Needs `backdrop`:
     * without one the panel is always solid.
     * @default true
     */
    frame?: boolean
    /**
     * Portal target. Maps to bits-ui Portal `to`.
     * @default document.body
     */
    container?: Element | string
    /**
     * Keep overlay and content mounted while closed so enter/exit animations can run.
     * @default false
     */
    keepMounted?: boolean
    portalProps?: Record<string, unknown>
    backdropProps?: Record<string, unknown>
    viewportProps?: Record<string, unknown>
    children?: Snippet
  }

  let {
    class: className,
    closeButton = true,
    closeLabel = 'Close',
    backdrop,
    frame = true,
    backdropProps,
    viewportProps,
    dir,
    style,
    children,
    ...rest
  }: Props = $props()

  const ctx = requireDrawerContext()

  const direction = useDirection()
  const resolvedDir = $derived(dir === 'rtl' || dir === 'ltr' ? dir : direction.current)
  const side = $derived(ctx.side)
  const depth = $derived(ctx.depth)
  const hasSnap = $derived(ctx.hasSnap)
  const snapSide = $derived(hasSnap && (side === 'bottom' || side === 'top') ? side : null)
  const forceBackdrop = $derived(backdropProps?.forceRender === true)
  const showBackdrop = $derived(forceBackdrop || (backdrop ?? depth <= 1))
  const showFrame = $derived(frame && showBackdrop)
  const split = $derived(splitModalProps(rest))
  const keepMounted = $derived(split.keepMounted)
  const trapFocus = $derived(ctx.modal === true || ctx.modal === 'trap-focus')
  const preventScroll = $derived(ctx.modal === true)

  // A top drawer slides up, so its resting snap offset translates the popup in the negative
  // direction. The gesture keeps the offset unsigned; only the transform is signed.
  const snapPointOffset = $derived(side === 'top' ? -ctx.snapOffset : ctx.snapOffset)
  // Base UI leaves the popup on `height: auto` and only freezes the measured height while a
  // nested drawer is stacked on top of it or while it animates out. Pinning it the whole time
  // stops the panel growing with its own content.
  const pinHeight = $derived(ctx.nestedPresentCount > 0 || !ctx.open)
  const popupStyle = $derived.by(() => {
    const parts: string[] = []
    if ((pinHeight || snapSide) && ctx.drawerHeight > 0) {
      parts.push(`--drawer-height: ${ctx.drawerHeight}px`)
    }
    parts.push(`--drawer-frontmost-height: ${ctx.frontmostHeight || ctx.drawerHeight || 0}px`)
    if (snapSide) {
      // Inline so the first paint already peeks at 0.4. `--drawer-snap-point-offset`
      // does not inherit, so a class fallback of 0px would open the sheet full-height.
      parts.push(`--drawer-snap-point-offset: ${snapPointOffset}px`)
      parts.push(`--snap-offset: ${ctx.snapOffset}px`)
    }
    if (typeof style === 'string' && style.length > 0) parts.push(style)
    return parts.length > 0 ? parts.join('; ') : undefined
  })

  let popupNode: HTMLElement | null = null

  function assignHeightVars(node: HTMLElement) {
    if ((pinHeight || snapSide) && ctx.drawerHeight > 0) {
      node.style.setProperty('--drawer-height', `${ctx.drawerHeight}px`)
    } else {
      node.style.removeProperty('--drawer-height')
    }
    node.style.setProperty('--drawer-frontmost-height', `${ctx.frontmostHeight || ctx.drawerHeight || 0}px`)
  }

  function assignSnapVars(node: HTMLElement) {
    // `--drawer-snap-point-offset` is registered `inherits: false`, so the popup
    // transform has to set the value itself.
    node.style.setProperty('--drawer-snap-point-offset', `${snapPointOffset}px`)
    node.style.setProperty('--snap-offset', `${ctx.snapOffset}px`)
  }

  function assignShellVars(node: HTMLElement) {
    assignHeightVars(node)
    assignSnapVars(node)
    // Set properties instead of rewriting `style`, so swipe frames do not restart
    // the enter/exit transform transition.
    node.style.setProperty('--drawer-swipe-movement-x', `${ctx.swipeMovementX}px`)
    node.style.setProperty('--drawer-swipe-movement-y', `${ctx.swipeMovementY}px`)
    node.style.setProperty('--drawer-swipe-progress', String(ctx.nestedSwipeProgress))
    node.style.setProperty('--nested-drawers', String(ctx.nestedCount))
  }

  const shellClasses = $derived(
    cn(
      'relative flex min-h-0 flex-col pointer-events-auto isolate outline-none contain-none!',
      'motion-safe:transition-[transform,height] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.32,1.2,0.4,1)]',
      'data-ending-style:motion-safe:duration-300 data-ending-style:motion-safe:ease-out',
      'data-nested-drawer-swiping:duration-0 data-swiping:duration-0 data-swiping:select-none',
      snapSide ? cn('touch-none', POPUP_SNAP_SIDE[snapSide]) : cn(STACK_VARS, POPUP_SIDE[side]),
      className,
    ),
  )

  const panelClasses = $derived(
    cn(
      'relative flex w-full flex-col rounded-2xl border',
      snapSide ? 'h-full min-h-full' : 'h-full min-h-0',
      snapSide
        ? cn(
            'bg-background border-border-overlay before:bg-background-strong',
            showFrame &&
              cn(
                'data-expanded:before:bg-background data-expanded:border-white/15 data-expanded:p-1.5',
                'data-expanded:bg-white/10 data-expanded:shadow-none data-expanded:backdrop-blur-sm',
              ),
          )
        : showFrame
          ? 'before:bg-background border-white/15 bg-white/10 p-1.5 backdrop-blur-sm'
          : 'bg-background border-border-overlay before:bg-background-strong',
      (hasSnap || !showFrame) && SHADOW_SIDE[side],
      FRAME_PAD_SIDE[side],
      HANDLE_SIDE[side],
      snapSide && 'touch-none',
    ),
  )

  function onInteractOutside(event: Event) {
    if (ctx.disablePointerDismissal) event.preventDefault()
  }

  function onOpenAutoFocus(event: Event) {
    // bits-ui focuses the first tabbable without `preventScroll`. A right/bottom drawer
    // translated off-screen creates scrollable overflow, so that focus scrolls the
    // viewport and the enter transform never plays. Base UI focuses with preventScroll.
    event.preventDefault()
    const container = popupNode
    if (!container) return
    requestAnimationFrame(() => {
      const first = container.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      ;(first ?? container).focus({ preventScroll: true })
    })
  }

  function attachBackdrop(node: HTMLElement) {
    $effect(() => {
      node.style.setProperty('--drawer-swipe-progress', String(ctx.swipeProgress))
    })
  }

  function attachShell(node: HTMLElement) {
    popupNode = node
    $effect(() => {
      assignShellVars(node)
    })
    return () => {
      if (popupNode === node) popupNode = null
    }
  }

  function attachPanel(node: HTMLElement) {
    const measure = () => {
      // Hold the last measured height while a nested drawer is stacked on top: the panel is
      // clipped to the frontmost drawer's height then, so remeasuring would latch that value.
      if (ctx.nestedPresentCount > 0) return
      const currentSide = ctx.side
      // Snap peeks by translating a full-size sheet. Measuring the visible slice would
      // feed back into `--snap-offset` and collapse 0.4. Use the same full size the
      // React popup keeps at `100dvh - 1rem`.
      if (ctx.hasSnap && (currentSide === 'top' || currentSide === 'bottom')) {
        ctx.setDrawerHeight(Math.max(window.innerHeight - 16, 0))
        return
      }
      const size = currentSide === 'left' || currentSide === 'right' ? node.offsetWidth : node.offsetHeight
      ctx.setDrawerHeight(size)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(node)
    window.addEventListener('resize', measure)

    const stopGesture = attachDrawerGesture(node, {
      get enabled() {
        return ctx.open
      },
      get side() {
        return ctx.side
      },
      get snapPoints() {
        return ctx.snapPoints
      },
      get snapToSequentialPoints() {
        return ctx.snapToSequentialPoints
      },
      get activeSnapPoint() {
        return ctx.activeSnapPoint
      },
      get snapOffset() {
        return ctx.snapOffset
      },
      onMove(x, y, progress) {
        ctx.setSwipe({ progress, x, y, swiping: true })
      },
      onDismiss() {
        ctx.setSwipe({
          progress: Math.max(ctx.swipeProgress, 1),
          x: ctx.swipeMovementX,
          y: ctx.swipeMovementY,
          swiping: false,
        })
        ctx.close()
      },
      onSnap(point) {
        ctx.setSwipe({ progress: 0, x: 0, y: 0, swiping: false })
        ctx.setSnapPoint(point)
      },
      onCancel() {
        ctx.setSwipe({ progress: 0, x: 0, y: 0, swiping: false })
      },
    })

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      stopGesture()
    }
  }
</script>

<BitsDialog.Portal {...asBitsAttrs(split.portal)}>
  {#if showBackdrop}
    <BitsDialog.Overlay
      {...asBitsAttrs(backdropProps ?? {})}
      data-slot="drawer-backdrop"
      data-swiping={ctx.swiping ? '' : undefined}
      forceMount={keepMounted ? true : undefined}
      class={cn(
        'fixed inset-0 z-50 bg-black/30 backdrop-blur-sm supports-[-webkit-touch-callout:none]:absolute',
        'opacity-[calc(1-var(--drawer-swipe-progress))]',
        'motion-safe:transition-opacity motion-safe:duration-400 motion-safe:ease-out',
        'data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0',
        backdropProps?.class as string | undefined,
      )}
      {@attach attachBackdrop}
    />
  {/if}
  <div
    {...asBitsAttrs(viewportProps ?? {})}
    data-slot="drawer-viewport"
    data-side={side}
    class={cn(
      'pointer-events-none fixed inset-0 z-50 flex overflow-clip p-2',
      VIEWPORT_SIDE[side],
      snapSide && 'touch-none',
      viewportProps?.class as string | undefined,
    )}
  >
    <BitsDialog.Content
      data-slot="drawer-popup"
      data-frame={showFrame ? '' : undefined}
      data-side={side}
      data-swipe-direction={SIDE_TO_SWIPE[side]}
      data-swiping={ctx.swiping ? '' : undefined}
      data-nested-drawer-open={ctx.nestedCount > 0 ? '' : undefined}
      data-nested-drawer-swiping={ctx.nestedSwiping ? '' : undefined}
      data-expanded={ctx.isExpanded ? '' : undefined}
      class={shellClasses}
      dir={resolvedDir}
      style={popupStyle}
      forceMount={keepMounted ? true : undefined}
      {trapFocus}
      {preventScroll}
      {onInteractOutside}
      {@attach attachShell}
      {...asBitsAttrs(split.popup)}
      {onOpenAutoFocus}
    >
      <div
        data-slot="drawer-panel"
        data-side={side}
        data-snap={snapSide ? '' : undefined}
        data-expanded={ctx.isExpanded ? '' : undefined}
        data-swiping={ctx.swiping ? '' : undefined}
        data-nested-drawer-open={ctx.nestedCount > 0 ? '' : undefined}
        data-nested-drawer-swiping={ctx.nestedSwiping ? '' : undefined}
        class={panelClasses}
        {@attach attachPanel}
      >
        <div
          data-slot="drawer-content"
          class={cn(
            'relative flex min-h-0 flex-col not-has-[>[data-slot=drawer-footer]]:pb-6 not-has-[>[data-slot=drawer-header]]:pt-6 [&>[data-slot=drawer-header]+[data-slot=drawer-footer]]:pt-0',
            showFrame || snapSide
              ? 'bg-background rounded-[calc(var(--radius-2xl)*5/6)]'
              : CONTENT_RECLAIM_SIDE[side],
            snapSide ? 'h-[calc(100dvh-1.5rem-var(--snap-offset,0))]' : 'flex-1',
          )}
        >
          {@render children?.()}
          {#if closeButton}
            <BitsDialog.Close
              aria-label={closeLabel}
              data-slot="drawer-close-button"
              class={cn(buttonVariants({ variant: 'outline', size: 'icon-sm' }), 'absolute inset-e-3 top-3 z-10')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path
                  d="M11.594 3.594c.225-.225.588-.225.813 0s.225.588 0 .812L8.813 8l3.594 3.594c.225.225.225.588 0 .813s-.588.225-.812 0L8 8.812l-3.594 3.594c-.225.225-.588.225-.812 0s-.225-.588 0-.812L7.188 8 3.594 4.406c-.225-.225-.225-.588 0-.812s.588.225.813 0L8 7.187l3.594-3.594z"
                />
              </svg>
            </BitsDialog.Close>
          {/if}
        </div>
      </div>
    </BitsDialog.Content>
  </div>
</BitsDialog.Portal>
