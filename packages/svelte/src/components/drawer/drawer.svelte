<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Dialog as BitsDialog } from 'bits-ui'
  import type { OverlayHandle } from '../../internal/overlay-handle.svelte'
  import { commitBindableChange } from '../../internal/utils'
  import {
    getDrawerContext,
    getDrawerProviderContext,
    setDrawerContext,
    type DrawerModal,
    type DrawerSide,
    type DrawerSnapPoint,
  } from './drawer-context'
  import { snapOffsetForPoint } from './drawer-gesture'

  type Props = {
    /** Controlled open state. Pair with `onOpenChange` or `bind:open`. */
    open?: boolean
    /**
     * Uncontrolled initial open state.
     * @default false
     */
    defaultOpen?: boolean
    /** Fires when the open state changes. */
    onOpenChange?: (open: boolean) => void
    /** Fires after the open/close transition finishes. */
    onOpenChangeComplete?: (open: boolean) => void
    /** Programmatic handle from `Drawer.createHandle()`. */
    handle?: OverlayHandle
    /**
     * The edge the drawer slides in from.
     * @default 'bottom'
     */
    side?: DrawerSide
    /**
     * Trap focus and block scroll/interaction with the page behind.
     * @default true
     */
    modal?: DrawerModal
    /**
     * Keep the drawer open when the backdrop is clicked.
     * @default false
     */
    disablePointerDismissal?: boolean
    /** Resting heights for a top/bottom drawer (fraction, px, or length). */
    snapPoints?: DrawerSnapPoint[]
    /**
     * Uncontrolled initial snap point (defaults to the first).
     */
    defaultSnapPoint?: DrawerSnapPoint | null
    /** Controlled active snap point. Pair with `onSnapPointChange` or `bind:snapPoint`. */
    snapPoint?: DrawerSnapPoint | null
    /** Fires when the active snap point changes. */
    onSnapPointChange?: (point: DrawerSnapPoint | null) => void
    /**
     * Disable velocity-based snap skipping, so drag distance picks the next snap point.
     * @default false
     */
    snapToSequentialPoints?: boolean
    children?: Snippet
  }

  let {
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    handle,
    side = 'bottom',
    modal = true,
    disablePointerDismissal = false,
    snapPoints,
    defaultSnapPoint,
    snapPoint = $bindable(),
    onSnapPointChange,
    snapToSequentialPoints = false,
    children,
  }: Props = $props()

  const parent = getDrawerContext()
  const indent = getDrawerProviderContext()
  const depth = (parent?.depth ?? 0) + 1
  const hasSnap = $derived(snapPoints != null && (side === 'top' || side === 'bottom'))

  let innerOpen = $state(false)
  innerOpen = untrack(() => handle?.open ?? open ?? defaultOpen)

  let nestedCount = $state(0)
  let nestedPresentCount = $state(0)
  let nestedSwiping = $state(false)
  let nestedSwipeProgress = $state(0)
  let swipeProgress = $state(0)
  let swipeMovementX = $state(0)
  let swipeMovementY = $state(0)
  let swiping = $state(false)
  let drawerHeight = $state(0)
  let frontmostHeight = $state(0)
  let innerSnap = $state<DrawerSnapPoint | null>(null)
  innerSnap = untrack(() => snapPoint ?? defaultSnapPoint ?? snapPoints?.[0] ?? null)

  // Stays true through the closing transition, so a parent keeps the child's height frozen
  // until the child has actually left. Matches Base UI's `open || transitionStatus ===
  // 'ending'`.
  let present = $state(false)
  $effect(() => {
    if (innerOpen) present = true
  })

  $effect(() => {
    if (handle) innerOpen = handle.open
    else if (open !== undefined) innerOpen = open
  })

  $effect(() => {
    if (snapPoint !== undefined) innerSnap = snapPoint
  })

  // Base UI flags `data-expanded` only for the literal `1` snap point, not for whichever
  // point happens to be the tallest.
  const isExpanded = $derived(hasSnap && innerSnap === 1)
  const snapOffset = $derived.by(() => {
    if (!innerOpen || !hasSnap || innerSnap == null) return 0
    const viewport = typeof window === 'undefined' ? 0 : window.innerHeight
    const size = drawerHeight || Math.max(viewport - 16, 0)
    if (size <= 0 || viewport <= 0) return 0
    return snapOffsetForPoint(innerSnap, size, viewport)
  })

  $effect(() => {
    if (!parent || !innerOpen) return
    const stop = untrack(() => parent.registerNested())
    return () => {
      untrack(() => {
        stop()
        parent.setNestedSwiping(false)
        parent.setNestedSwipeProgress(0)
      })
    }
  })

  $effect(() => {
    if (!parent || !present) return
    const stop = untrack(() => parent.registerNestedPresent())
    return () => untrack(stop)
  })

  $effect(() => {
    if (!parent || !innerOpen) return
    const nextSwiping = swiping
    const nextProgress = swipeProgress
    untrack(() => {
      parent.setNestedSwiping(nextSwiping)
      parent.setNestedSwipeProgress(nextProgress)
    })
  })

  $effect(() => {
    if (!parent || !innerOpen) return
    const height = frontmostHeight || drawerHeight
    untrack(() => parent.setFrontmostHeight(height))
  })

  $effect(() => {
    if (!indent || depth !== 1 || !innerOpen) return
    untrack(() => indent.incrementOpen())
    return () => untrack(() => indent.decrementOpen())
  })

  $effect(() => {
    if (!indent || depth !== 1) return
    // Only a top-level drawer's own swipe un-indents the page; swiping a nested drawer
    // leaves the page where it is.
    const progress = innerOpen ? swipeProgress : 0
    untrack(() => indent.setSwipeProgress(progress))
  })

  function handleOpenChangeComplete(next: boolean) {
    if (!next) present = false
    onOpenChangeComplete?.(next)
  }

  function handleOpenChange(next: boolean) {
    if (next) {
      swiping = false
      swipeProgress = 0
      swipeMovementX = 0
      swipeMovementY = 0
    } else {
      swiping = false
      if (hasSnap && snapPoint === undefined) {
        innerSnap = defaultSnapPoint ?? snapPoints?.[0] ?? null
      }
    }
    if (handle) {
      handle.open = next
      innerOpen = handle.open
      onOpenChange?.(next)
      return
    }
    commitBindableChange({
      next,
      bound: open,
      setBound: (value) => {
        open = value
      },
      setInner: (value) => {
        innerOpen = value
      },
      onChange: onOpenChange,
    })
  }

  function handleSnapPointChange(next: DrawerSnapPoint | null) {
    commitBindableChange({
      next,
      bound: snapPoint,
      setBound: (value) => {
        snapPoint = value
      },
      setInner: (value) => {
        innerSnap = value
      },
      onChange: onSnapPointChange,
    })
  }

  setDrawerContext({
    get side() {
      return side
    },
    get depth() {
      return depth
    },
    get hasSnap() {
      return hasSnap
    },
    get open() {
      return innerOpen
    },
    get present() {
      return present
    },
    get nestedCount() {
      return nestedCount
    },
    get nestedPresentCount() {
      return nestedPresentCount
    },
    get nestedSwiping() {
      return nestedSwiping
    },
    get nestedSwipeProgress() {
      return nestedSwipeProgress
    },
    get swipeProgress() {
      return swipeProgress
    },
    get swipeMovementX() {
      return swipeMovementX
    },
    get swipeMovementY() {
      return swipeMovementY
    },
    get swiping() {
      return swiping
    },
    get snapOffset() {
      return snapOffset
    },
    get isExpanded() {
      return isExpanded
    },
    get drawerHeight() {
      return drawerHeight
    },
    get frontmostHeight() {
      return frontmostHeight
    },
    get modal() {
      return modal
    },
    get disablePointerDismissal() {
      return disablePointerDismissal
    },
    get snapPoints() {
      return hasSnap ? snapPoints : undefined
    },
    get snapToSequentialPoints() {
      return snapToSequentialPoints
    },
    get activeSnapPoint() {
      return innerSnap
    },
    close() {
      handleOpenChange(false)
    },
    setSwipe({ progress, x, y, swiping: nextSwiping }) {
      swipeProgress = progress
      swipeMovementX = x
      swipeMovementY = y
      swiping = nextSwiping
    },
    setSnapPoint(point) {
      handleSnapPointChange(point)
    },
    setDrawerHeight(px) {
      drawerHeight = px
    },
    setFrontmostHeight(px) {
      frontmostHeight = px
    },
    registerNested() {
      nestedCount += 1
      return () => {
        nestedCount = Math.max(0, nestedCount - 1)
      }
    },
    registerNestedPresent() {
      nestedPresentCount += 1
      return () => {
        nestedPresentCount = Math.max(0, nestedPresentCount - 1)
      }
    },
    setNestedSwiping(next) {
      nestedSwiping = next
    },
    setNestedSwipeProgress(progress) {
      nestedSwipeProgress = progress
    },
  })
</script>

<BitsDialog.Root bind:open={innerOpen} onOpenChange={handleOpenChange} onOpenChangeComplete={handleOpenChangeComplete}>
  {@render children?.()}
</BitsDialog.Root>
