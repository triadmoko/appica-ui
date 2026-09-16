import { getContext, setContext } from 'svelte'

export type DrawerSide = 'top' | 'bottom' | 'left' | 'right'
export type DrawerModal = boolean | 'trap-focus'
export type DrawerSnapPoint = number | string

export interface DrawerContextValue {
  side: DrawerSide
  depth: number
  hasSnap: boolean
  open: boolean
  /** Open, or still mounted while the closing transition runs. */
  present: boolean
  /** Nested drawers that are open. Drives `--nested-drawers` and `data-nested-drawer-open`. */
  nestedCount: number
  /** Nested drawers still mounted, closing ones included. Freezes the popup height. */
  nestedPresentCount: number
  nestedSwiping: boolean
  /** Swipe progress of the frontmost nested drawer, 0 when none is being swiped. */
  nestedSwipeProgress: number
  /** This drawer's own swipe progress. */
  swipeProgress: number
  swipeMovementX: number
  swipeMovementY: number
  swiping: boolean
  snapOffset: number
  isExpanded: boolean
  drawerHeight: number
  frontmostHeight: number
  modal: DrawerModal
  disablePointerDismissal: boolean
  snapPoints: DrawerSnapPoint[] | undefined
  snapToSequentialPoints: boolean
  activeSnapPoint: DrawerSnapPoint | null
  close: () => void
  setSwipe: (opts: { progress: number; x: number; y: number; swiping: boolean }) => void
  setSnapPoint: (point: DrawerSnapPoint | null) => void
  setDrawerHeight: (px: number) => void
  setFrontmostHeight: (px: number) => void
  registerNested: () => () => void
  registerNestedPresent: () => () => void
  setNestedSwiping: (swiping: boolean) => void
  setNestedSwipeProgress: (progress: number) => void
}

const KEY = Symbol('appica-drawer')

export function setDrawerContext(value: DrawerContextValue) {
  setContext(KEY, value)
}

export function getDrawerContext(): DrawerContextValue | undefined {
  return getContext<DrawerContextValue>(KEY)
}

export function requireDrawerContext(): DrawerContextValue {
  const ctx = getDrawerContext()
  if (!ctx) throw new Error('DrawerContent must be used within Drawer')
  return ctx
}

export interface DrawerProviderContextValue {
  openCount: number
  swipeProgress: number
  incrementOpen: () => void
  decrementOpen: () => void
  setSwipeProgress: (progress: number) => void
}

const PROVIDER_KEY = Symbol('appica-drawer-provider')

export function setDrawerProviderContext(value: DrawerProviderContextValue) {
  setContext(PROVIDER_KEY, value)
}

export function getDrawerProviderContext(): DrawerProviderContextValue | undefined {
  return getContext<DrawerProviderContextValue>(PROVIDER_KEY)
}
