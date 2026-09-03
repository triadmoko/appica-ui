import { getContext, setContext } from 'svelte'

export type TrackCursorAxis = 'none' | 'x' | 'y' | 'both'

export type TooltipCursor = {
  x: number
  y: number
}

export type TooltipContextValue = {
  getTrackCursorAxis: () => TrackCursorAxis
  readonly cursor: TooltipCursor
  getTriggerEl: () => HTMLElement | null
  setTriggerEl: (el: HTMLElement | null) => void
  onPointerMove: (event: MouseEvent) => void
}

const KEY = Symbol('appica-tooltip')

export function setTooltipContext(value: TooltipContextValue) {
  setContext(KEY, value)
}

export function getTooltipContext(): TooltipContextValue | undefined {
  return getContext<TooltipContextValue>(KEY)
}

export function getTrackCursorVirtualRect(
  axis: TrackCursorAxis,
  triggerEl: HTMLElement | null,
  cursor: TooltipCursor,
): DOMRect {
  const domRect = triggerEl?.getBoundingClientRect() ?? new DOMRect()

  if (axis === 'x') {
    return new DOMRect(cursor.x, domRect.top, 0, domRect.height)
  }
  if (axis === 'y') {
    return new DOMRect(domRect.left, cursor.y, domRect.width, 0)
  }
  if (axis === 'both') {
    return new DOMRect(cursor.x, cursor.y, 0, 0)
  }

  return domRect
}
