import type { DrawerSide, DrawerSnapPoint } from './drawer-context'

export type DrawerSwipeAxis = 'up' | 'down' | 'left' | 'right'

export const SIDE_TO_SWIPE = {
  top: 'up',
  bottom: 'down',
  left: 'left',
  right: 'right',
} as const satisfies Record<DrawerSide, DrawerSwipeAxis>

/*
  Constants mirror Base UI's drawer swipe handling, so a gesture that dismisses the React
  drawer dismisses this one at the same distance and the same flick speed. Velocities are
  px/ms.
*/
const MIN_SWIPE_THRESHOLD = 10
const SWIPE_THRESHOLD_RATIO = 0.5
const FAST_SWIPE_VELOCITY = 0.5
const SNAP_VELOCITY_THRESHOLD = 0.5
const SNAP_VELOCITY_MULTIPLIER = 300
const MAX_SNAP_VELOCITY = 4
const MIN_VELOCITY_DURATION_MS = 50
const MIN_RELEASE_VELOCITY_DURATION_MS = 16
const MAX_RELEASE_VELOCITY_AGE_MS = 80
const AXIS_LOCK_SLOP = 6
const AXIS_LOCK_BIAS = 2

const IGNORE_SELECTOR =
  'a,button,input,textarea,select,label,[contenteditable="true"],[role="button"],[role="link"],[role="switch"],[role="checkbox"],[role="radio"],[role="slider"],[role="tab"],[data-slot="drawer-trigger"],[data-slot="drawer-close"],[data-slot="drawer-close-button"]'

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Synthetic pointer events often carry a zero timestamp, which cannot time a flick. */
function validTime(timeStamp: number): number | null {
  return Number.isFinite(timeStamp) && timeStamp > 0 ? timeStamp : null
}

export function parseLength(value: string, viewportSize: number): number {
  const trimmed = value.trim()
  if (trimmed.endsWith('%')) return (parseFloat(trimmed) / 100) * viewportSize
  if (trimmed.endsWith('rem')) return parseFloat(trimmed) * 16
  if (trimmed.endsWith('px')) return parseFloat(trimmed)
  if (trimmed.endsWith('dvh') || trimmed.endsWith('vh')) return (parseFloat(trimmed) / 100) * viewportSize
  if (trimmed.endsWith('dvw') || trimmed.endsWith('vw')) return (parseFloat(trimmed) / 100) * viewportSize
  return parseFloat(trimmed) || 0
}

export function resolveSnapPointPx(point: DrawerSnapPoint, viewportSize: number): number {
  if (typeof point === 'string') return parseLength(point, viewportSize)
  if (point <= 1) return clamp(point, 0, 1) * viewportSize
  return point
}

export function snapOffsetForPoint(point: DrawerSnapPoint, drawerSize: number, viewportSize: number): number {
  const maxHeight = Math.min(drawerSize, viewportSize)
  const visible = clamp(resolveSnapPointPx(point, viewportSize), 0, maxHeight)
  return Math.max(0, drawerSize - visible)
}

export interface ResolvedSnapPoint {
  value: DrawerSnapPoint
  height: number
  offset: number
}

/**
 * Resolves every snap point to a visible height and the matching translate offset, dropping
 * points that land within a pixel of one another.
 */
export function resolveSnapPoints(
  points: DrawerSnapPoint[] | undefined,
  drawerSize: number,
  viewportSize: number,
): ResolvedSnapPoint[] {
  if (!points || points.length === 0 || drawerSize <= 0 || viewportSize <= 0) return []
  const maxHeight = Math.min(drawerSize, viewportSize)
  const resolved = points.map((value) => {
    const height = clamp(resolveSnapPointPx(value, viewportSize), 0, maxHeight)
    return { value, height, offset: Math.max(0, drawerSize - height) }
  })
  if (resolved.length <= 1) return resolved

  const deduped: ResolvedSnapPoint[] = []
  const seen: number[] = []
  for (let index = resolved.length - 1; index >= 0; index -= 1) {
    const point = resolved[index]
    if (!point || seen.some((height) => Math.abs(height - point.height) <= 1)) continue
    seen.push(point.height)
    deduped.push(point)
  }
  deduped.reverse()
  return deduped
}

/** Index of the value closest to `target`, or `-1` when there is nothing to pick from. */
export function closestSnapPointIndex(values: number[], target: number): number {
  let closestIndex = -1
  let closestDistance = Infinity
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index]
    if (value === undefined) continue
    const distance = Math.abs(value - target)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  }
  return closestIndex
}

/**
 * Square-root damping once the drag overshoots the fully-open edge, so the popup resists
 * travelling past it instead of sliding out of the viewport.
 */
export function snapPointSwipeMovement(baseOffset: number, movement: number): number {
  const nextOffset = baseOffset + movement
  if (nextOffset >= 0) return movement
  return -Math.sqrt(-nextOffset) - baseOffset
}

export function swipeDisplacement(axis: DrawerSwipeAxis, deltaX: number, deltaY: number): number {
  switch (axis) {
    case 'up':
      return -deltaY
    case 'down':
      return deltaY
    case 'left':
      return -deltaX
    case 'right':
      return deltaX
    default: {
      const _exhaustive: never = axis
      return _exhaustive
    }
  }
}

/** Resistance applied to a drag that pulls the drawer further open than its resting edge. */
function dampDisplacement(displacement: number): number {
  return displacement < 0 ? -Math.sqrt(-displacement) : displacement
}

function findScrollable(start: EventTarget | null, root: HTMLElement): HTMLElement | null {
  let el: HTMLElement | null = start instanceof HTMLElement ? start : null
  while (el && el !== root) {
    const style = getComputedStyle(el)
    const oy = style.overflowY
    const ox = style.overflowX
    if ((oy === 'auto' || oy === 'scroll' || oy === 'overlay') && el.scrollHeight > el.clientHeight + 1) {
      return el
    }
    if ((ox === 'auto' || ox === 'scroll' || ox === 'overlay') && el.scrollWidth > el.clientWidth + 1) {
      return el
    }
    el = el.parentElement
  }
  return null
}

function scrollBlocksSwipe(scrollable: HTMLElement, axis: DrawerSwipeAxis): boolean {
  switch (axis) {
    case 'down':
      return scrollable.scrollTop > 1
    case 'up':
      return scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 1
    case 'right':
      return scrollable.scrollLeft > 1
    case 'left':
      return scrollable.scrollLeft + scrollable.clientWidth < scrollable.scrollWidth - 1
    default: {
      const _exhaustive: never = axis
      return _exhaustive
    }
  }
}

export function pickSnapPoint(opts: {
  points: DrawerSnapPoint[]
  viewportSize: number
  drawerSize: number
  currentOffset: number
  movement: number
  velocity: number
  sequential: boolean
  currentPoint: DrawerSnapPoint | null
}): { dismiss: true } | { dismiss: false; point: DrawerSnapPoint } {
  const { points, viewportSize, drawerSize, currentOffset, movement, velocity, sequential, currentPoint } = opts
  const ranked = resolveSnapPoints(points, drawerSize, viewportSize)
  if (ranked.length === 0) return { dismiss: false, point: currentPoint ?? points[0] ?? 1 }

  const dragDirection = Math.sign(movement)
  const dragTargetOffset = clamp(currentOffset + movement, 0, drawerSize)
  const velocityOffset =
    Math.abs(velocity) >= SNAP_VELOCITY_THRESHOLD
      ? clamp(velocity, -MAX_SNAP_VELOCITY, MAX_SNAP_VELOCITY) * SNAP_VELOCITY_MULTIPLIER
      : 0
  const targetOffset = sequential ? dragTargetOffset : clamp(dragTargetOffset + velocityOffset, 0, drawerSize)

  if (sequential) {
    const ordered = [...ranked].sort((first, second) => first.offset - second.offset)
    const offsets = ordered.map((point) => point.offset)
    const currentIndex = closestSnapPointIndex(offsets, currentOffset)
    let target = ordered[closestSnapPointIndex(offsets, targetOffset)] ?? ordered[0]
    let effectiveTargetOffset = targetOffset
    if (!target) return { dismiss: false, point: currentPoint ?? points[0] ?? 1 }
    const velocityDirection = Math.sign(velocity)
    const shouldAdvance =
      dragDirection !== 0 &&
      velocityDirection !== 0 &&
      velocityDirection === dragDirection &&
      Math.abs(velocity) >= SNAP_VELOCITY_THRESHOLD

    if (shouldAdvance) {
      const adjacentIndex = clamp(currentIndex + dragDirection, 0, ordered.length - 1)
      const adjacent = ordered[adjacentIndex]
      if (adjacentIndex !== currentIndex && adjacent) {
        const shouldForceAdjacent =
          dragDirection > 0 ? targetOffset < adjacent.offset : targetOffset > adjacent.offset
        if (shouldForceAdjacent) {
          target = adjacent
          effectiveTargetOffset = adjacent.offset
        }
      } else if (adjacentIndex === currentIndex && dragDirection > 0) {
        return { dismiss: true }
      }
    }

    const closeDistance = Math.abs(effectiveTargetOffset - drawerSize)
    if (closeDistance < Math.abs(effectiveTargetOffset - target.offset)) return { dismiss: true }
    return { dismiss: false, point: target.value }
  }

  if (velocity >= FAST_SWIPE_VELOCITY && movement > 0) return { dismiss: true }

  const closest = ranked[closestSnapPointIndex(ranked.map((point) => point.offset), targetOffset)] ?? ranked[0]
  if (!closest) return { dismiss: false, point: currentPoint ?? points[0] ?? 1 }
  if (Math.abs(targetOffset - drawerSize) < Math.abs(targetOffset - closest.offset)) return { dismiss: true }
  return { dismiss: false, point: closest.value }
}

export type DrawerGestureHandlers = {
  get enabled(): boolean
  get side(): DrawerSide
  get snapPoints(): DrawerSnapPoint[] | undefined
  get snapToSequentialPoints(): boolean
  get activeSnapPoint(): DrawerSnapPoint | null
  get snapOffset(): number
  onMove: (movementX: number, movementY: number, progress: number) => void
  onDismiss: () => void
  onSnap: (point: DrawerSnapPoint) => void
  onCancel: () => void
}

export function attachDrawerGesture(node: HTMLElement, handlers: DrawerGestureHandlers): () => void {
  let pointerId: number | null = null
  let startX = 0
  let startY = 0
  let startTime: number | null = null
  let sampleDisplacement = 0
  let sampleTime: number | null = null
  let sampleVelocity = 0
  let locked = false
  let dragging = false
  let blocked = false

  function axisForSide(): DrawerSwipeAxis {
    return SIDE_TO_SWIPE[handlers.side]
  }

  function isSnapGesture(): boolean {
    const side = handlers.side
    const points = handlers.snapPoints
    return Boolean(points && points.length > 0 && (side === 'top' || side === 'bottom'))
  }

  function viewportSize(): number {
    const side = handlers.side
    return side === 'left' || side === 'right' ? window.innerWidth : window.innerHeight
  }

  function drawerSize(): number {
    const side = handlers.side
    return side === 'left' || side === 'right' ? node.offsetWidth : node.offsetHeight
  }

  function bindWindowTracking() {
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', finish)
    window.addEventListener('pointercancel', finish)
  }

  function unbindWindowTracking() {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', finish)
    window.removeEventListener('pointercancel', finish)
  }

  function stopTracking() {
    dragging = false
    pointerId = null
    unbindWindowTracking()
  }

  function onPointerDown(event: PointerEvent) {
    if (!handlers.enabled || event.button !== 0) return
    if (event.target instanceof Element && event.target.closest(IGNORE_SELECTOR)) return
    pointerId = event.pointerId
    startX = event.clientX
    startY = event.clientY
    startTime = validTime(event.timeStamp)
    sampleDisplacement = 0
    sampleTime = startTime
    sampleVelocity = 0
    locked = false
    dragging = true
    blocked = false
    const scrollable = findScrollable(event.target, node)
    if (scrollable && scrollBlocksSwipe(scrollable, axisForSide())) {
      blocked = true
    }
    bindWindowTracking()
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging || event.pointerId !== pointerId) return
    const deltaX = event.clientX - startX
    const deltaY = event.clientY - startY
    const axis = axisForSide()

    if (!locked) {
      const wantsHorizontal = axis === 'left' || axis === 'right'
      const along = Math.abs(wantsHorizontal ? deltaX : deltaY)
      const across = Math.abs(wantsHorizontal ? deltaY : deltaX)
      if (across >= AXIS_LOCK_SLOP && across > along + AXIS_LOCK_BIAS) {
        stopTracking()
        handlers.onCancel()
        return
      }
      if (along < AXIS_LOCK_SLOP) return
      if (blocked) {
        stopTracking()
        return
      }
      locked = true
      startTime = validTime(event.timeStamp)
      sampleDisplacement = swipeDisplacement(axis, deltaX, deltaY)
      sampleTime = startTime
      sampleVelocity = 0
      try {
        node.setPointerCapture?.(event.pointerId)
      } catch {
        // Untrusted / synthetic pointers cannot be captured.
      }
    }

    event.preventDefault()
    const displacement = swipeDisplacement(axis, deltaX, deltaY)
    const now = validTime(event.timeStamp)
    if (now !== null && sampleTime !== null && now > sampleTime) {
      sampleVelocity = (displacement - sampleDisplacement) / Math.max(now - sampleTime, MIN_RELEASE_VELOCITY_DURATION_MS)
      sampleDisplacement = displacement
      sampleTime = now
    }

    const size = Math.max(drawerSize(), 1)

    if (isSnapGesture()) {
      const baseOffset = handlers.snapOffset
      const move = axis === 'down' ? snapPointSwipeMovement(baseOffset, displacement) : displacement
      const ranked = resolveSnapPoints(handlers.snapPoints, size, viewportSize())
      const offsets = ranked.map((point) => point.offset)
      const minOffset = offsets.length > 0 ? Math.min(...offsets) : 0
      const maxOffset = offsets.length > 0 ? Math.max(...offsets) : 0
      const range = maxOffset - minOffset
      const nextOffset = clamp(baseOffset + displacement, 0, size)
      const progress = range > 0 ? clamp((nextOffset - minOffset) / range, 0, 1) : 0
      handlers.onMove(0, axis === 'up' ? -move : move, progress)
      return
    }

    const move = dampDisplacement(displacement)
    const progress = clamp(move / size, 0, 1)
    const x = axis === 'left' || axis === 'right' ? move * (axis === 'left' ? -1 : 1) : 0
    const y = axis === 'up' || axis === 'down' ? move * (axis === 'up' ? -1 : 1) : 0
    handlers.onMove(x, y, progress)
  }

  function finish(event: PointerEvent) {
    if (!dragging || event.pointerId !== pointerId) return
    const wasLocked = locked
    stopTracking()
    locked = false
    if (!wasLocked) {
      handlers.onCancel()
      return
    }

    const axis = axisForSide()
    const displacement = swipeDisplacement(axis, event.clientX - startX, event.clientY - startY)
    const size = Math.max(drawerSize(), 1)

    // Average velocity over the whole gesture, and the velocity of the final flick. Base UI
    // prefers the flick when it is recent enough, which is what makes a short fast swipe
    // dismiss a drawer the drag distance alone would not.
    const endTime = validTime(event.timeStamp)
    const duration = startTime !== null && endTime !== null && endTime > startTime ? endTime - startTime : 0
    const averageVelocity = duration > 0 ? displacement / Math.max(duration, MIN_VELOCITY_DURATION_MS) : 0
    let releaseVelocity = sampleVelocity
    if (sampleTime !== null && endTime !== null && endTime >= sampleTime) {
      const age = endTime - sampleTime
      if (age <= MAX_RELEASE_VELOCITY_AGE_MS) {
        const tailVelocity =
          (displacement - sampleDisplacement) / Math.max(age, MIN_RELEASE_VELOCITY_DURATION_MS)
        if (tailVelocity !== 0) releaseVelocity = tailVelocity
      } else {
        releaseVelocity = 0
      }
    }
    const resolvedVelocity = releaseVelocity !== 0 ? releaseVelocity : averageVelocity

    if (isSnapGesture()) {
      const result = pickSnapPoint({
        points: handlers.snapPoints ?? [],
        viewportSize: viewportSize(),
        drawerSize: size,
        currentOffset: handlers.snapOffset,
        movement: displacement,
        velocity: resolvedVelocity,
        sequential: handlers.snapToSequentialPoints,
        currentPoint: handlers.activeSnapPoint,
      })
      if (result.dismiss) {
        handlers.onDismiss()
        return
      }
      handlers.onSnap(result.point)
      return
    }

    if (displacement <= 0) {
      handlers.onCancel()
      return
    }
    if (averageVelocity >= FAST_SWIPE_VELOCITY) {
      handlers.onDismiss()
      return
    }
    if (displacement > Math.max(size * SWIPE_THRESHOLD_RATIO, MIN_SWIPE_THRESHOLD)) {
      handlers.onDismiss()
      return
    }
    handlers.onCancel()
  }

  function onTouchMove(event: TouchEvent) {
    if (!dragging || !locked) return
    event.preventDefault()
  }

  node.addEventListener('pointerdown', onPointerDown)
  node.addEventListener('touchmove', onTouchMove, { passive: false })

  return () => {
    unbindWindowTracking()
    node.removeEventListener('pointerdown', onPointerDown)
    node.removeEventListener('touchmove', onTouchMove)
  }
}
