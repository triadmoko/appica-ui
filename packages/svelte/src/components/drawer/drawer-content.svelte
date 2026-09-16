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
    PANEL_ORIGIN,
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
  const backdropStyle = $derived(`--drawer-swipe-progress: ${ctx.swipeProgress}`)
  const popupStyle = $derived(typeof style === 'string' ? style : undefined)

  function assignShellVars(node: HTMLElement) {
    if (pinHeight && ctx.drawerHeight > 0) {
      node.style.setProperty('--drawer-height', `${ctx.drawerHeight}px`)
    } else {
      node.style.removeProperty('--drawer-height')
    }
    node.style.setProperty('--drawer-frontmost-height', `${ctx.frontmostHeight || ctx.drawerHeight || 0}px`)
  }

  function assignPanelVars(node: HTMLElement) {
    // `--drawer-swipe-progress` on the panel tracks the *nested* drawer's swipe: it un-stacks
    // this panel as the drawer in front of it is swiped away.
    node.style.setProperty('--drawer-swipe-progress', String(ctx.nestedSwipeProgress))
    node.style.setProperty('--drawer-swipe-movement-x', `${ctx.swipeMovementX}px`)
    node.style.setProperty('--drawer-swipe-movement-y', `${ctx.swipeMovementY}px`)
    node.style.setProperty('--nested-drawers', String(ctx.nestedCount))
    node.style.setProperty('--drawer-snap-point-offset', `${snapPointOffset}px`)
  }

  const shellClasses = $derived(
    cn(
      'relative flex min-h-0 flex-col pointer-events-auto isolate outline-none contain-none!',
      'motion-safe:transition-[height] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.32,1.2,0.4,1)]',
      'data-ending-style:motion-safe:duration-300 data-nested-drawer-swiping:duration-0',
      snapSide ? cn('touch-none', POPUP_SNAP_SIDE[snapSide]) : POPUP_SIDE[side],
      className,
    ),
  )

  const panelClasses = $derived(
    cn(
      'relative flex h-full min-h-0 w-full flex-col rounded-2xl border',
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
      PANEL_ORIGIN[side],
      'motion-safe:transition-[--drawer-enter,scale,height] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.32,1.2,0.4,1)]',
      'data-swiping:duration-0 data-swiping:select-none data-nested-drawer-swiping:duration-0',
      snapSide ? 'touch-none' : STACK_VARS,
    ),
  )

  function onInteractOutside(event: Event) {
    if (ctx.disablePointerDismissal) event.preventDefault()
  }

  function attachShell(node: HTMLElement) {
    $effect(() => {
      assignShellVars(node)
    })
  }

  function attachPanel(node: HTMLElement) {
    $effect(() => {
      assignPanelVars(node)
    })
    const measure = () => {
      // Hold the last measured height while a nested drawer is stacked on top: the panel is
      // clipped to the frontmost drawer's height then, so remeasuring would latch that value.
      if (ctx.nestedPresentCount > 0) return
      const currentSide = ctx.side
      const size = currentSide === 'left' || currentSide === 'right' ? node.offsetWidth : node.offsetHeight
      ctx.setDrawerHeight(size)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(node)

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
      style={backdropStyle}
    />
  {/if}
  <div
    {...asBitsAttrs(viewportProps ?? {})}
    data-slot="drawer-viewport"
    data-side={side}
    class={cn(
      'pointer-events-none fixed inset-0 z-50 flex overflow-hidden p-2',
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
            snapSide ? 'h-[calc(100dvh-1.5rem-var(--snap-offset,0px))]' : 'flex-1',
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
                  d="M11.594 3.594c.225-.225.588-.225.813 0s.225.588 0 .812L8.813 8l3.594 3.594c.225.225.225.588 0 .813s-.588.225-.812 0L8 8.812l-3.594 3.594c-.225.225-.588.225-.812 0s-.225-.588 0-.812L7.188 8 3.594 4.406c-.225-.225-.225-.588 0-.812s.588-.225.813 0L8 7.187l3.594-3.594z"
                />
              </svg>
            </BitsDialog.Close>
          {/if}
        </div>
      </div>
    </BitsDialog.Content>
  </div>
</BitsDialog.Portal>

<style>
  /*
    Mix off-screen and rest in one `translate`. Only `--drawer-enter` is interpolated
    (1 off-screen, 0 rest), so right/bottom do not depend on percent-vs-px transform lists.
    bits-ui starting/ending attributes stay on the dialog shell.
  */
  :global {
    [data-slot='drawer-panel'] {
      --drawer-enter: 0;
      --drawer-off-x: 0px;
      --drawer-off-y: 0px;
      --drawer-rest-x: 0px;
      --drawer-rest-y: 0px;
      translate: calc(
          (var(--drawer-enter) * var(--drawer-off-x)) + ((1 - var(--drawer-enter)) * var(--drawer-rest-x))
        )
        calc((var(--drawer-enter) * var(--drawer-off-y)) + ((1 - var(--drawer-enter)) * var(--drawer-rest-y)));
      scale: var(--stack-scale, 1);
    }

    [data-slot='drawer-popup']:is([data-starting-style], [data-ending-style]) [data-slot='drawer-panel'] {
      --drawer-enter: 1;
    }

    [data-slot='drawer-popup'][data-ending-style] [data-slot='drawer-panel'] {
      transition-duration: 300ms;
      transition-timing-function: ease-out;
    }

    [data-slot='drawer-panel'][data-side='bottom'] {
      --drawer-off-x: 0px;
      --drawer-off-y: calc(100% + 0.5rem);
      --drawer-rest-x: 0px;
      --drawer-rest-y: calc(var(--drawer-swipe-movement-y) - var(--stack-offset, 0px));
    }

    [data-slot='drawer-panel'][data-side='top'] {
      --drawer-off-x: 0px;
      --drawer-off-y: calc(-100% - 0.5rem);
      --drawer-rest-x: 0px;
      --drawer-rest-y: calc(var(--drawer-swipe-movement-y) + var(--stack-offset, 0px));
    }

    [data-slot='drawer-panel'][data-side='left'] {
      --drawer-off-x: calc(-100% - 0.5rem);
      --drawer-off-y: 0px;
      --drawer-rest-x: calc(var(--drawer-swipe-movement-x) + var(--stack-offset, 0px));
      --drawer-rest-y: 0px;
    }

    [data-slot='drawer-panel'][data-side='right'] {
      --drawer-off-x: calc(100% + 0.5rem);
      --drawer-off-y: 0px;
      --drawer-rest-x: calc(var(--drawer-swipe-movement-x) - var(--stack-offset, 0px));
      --drawer-rest-y: 0px;
    }

    [data-slot='drawer-panel'][data-snap][data-side='bottom'],
    [data-slot='drawer-panel'][data-snap][data-side='top'] {
      --drawer-rest-x: 0px;
      --drawer-rest-y: calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y));
    }
  }
</style>
