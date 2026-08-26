import { getContext, setContext } from 'svelte'
import type { HTMLButtonAttributes } from 'svelte/elements'
import type { ToastSwipeAxis } from './toast-swipe'

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export const TOAST_STATUS_ICONS = ['success', 'error', 'info', 'warning', 'loading'] as const

export type ToastStatusIcon = (typeof TOAST_STATUS_ICONS)[number]

export type ToastPayload = {
  icon?: ToastStatusIcon | (string & {})
  thumbnail?: string
  thumbnailAlt?: string
}

export type ToastActionProps = Pick<HTMLButtonAttributes, 'onclick' | 'disabled' | 'class' | 'id'> & {
  children?: string
  onClick?: (event: MouseEvent) => void
}

export type ToastData = {
  id: string
  title?: string
  description?: string
  timeout?: number
  /**
   * Opt this toast into a countdown bar, overriding the Toaster `progress` prop.
   */
  progress?: boolean
  /**
   * Discriminator for conditional chrome (for example promise loading/success/error).
   */
  type?: string
  /**
   * Screen-reader urgency. `high` is announced with `role="alert"`.
   * @default 'low'
   */
  priority?: 'low' | 'high'
  data?: ToastPayload
  actionProps?: ToastActionProps
  onClose?: () => void
  onRemove?: () => void
  height?: number
  updateKey?: number
  limited?: boolean
  swipeDirection?: ToastSwipeAxis
  /**
   * True while the exit animation is running. Set by `close()`, cleared by `remove()`.
   */
  closing?: boolean
}

export type AddToastOptions = Omit<
  ToastData,
  'id' | 'closing' | 'limited' | 'updateKey' | 'height' | 'swipeDirection'
> & { id?: string }

export type ToastPromiseMessage<T = unknown> =
  | string
  | AddToastOptions
  | ((value: T) => string | AddToastOptions)

export type ToastPromiseMessages<T = unknown> = {
  loading: ToastPromiseMessage
  success: ToastPromiseMessage<T>
  error: ToastPromiseMessage<unknown>
}

export type ToastManagerOptions = {
  timeout?: number
  limit?: number
}

export type ToastManager = {
  readonly toasts: ToastData[]
  readonly timeout: number
  readonly limit: number
  readonly timersPaused: boolean
  add: (options: AddToastOptions) => string
  close: (id?: string, swipeDirection?: ToastSwipeAxis) => void
  /** Drop a toast immediately, skipping the exit animation. */
  remove: (id: string) => void
  update: (id: string, options: Partial<AddToastOptions>) => void
  promise: <T>(work: Promise<T>, messages: ToastPromiseMessages<T>) => Promise<T>
  pauseTimers: () => void
  resumeTimers: () => void
  setHeight: (id: string, height: number) => void
  configure: (options: ToastManagerOptions) => void
}

const KEY = Symbol('appica-toast-manager')
const DEFAULT_TIMEOUT = 5000
const DEFAULT_LIMIT = 3
/** Matches toast CSS `transform` / `opacity` duration (0.5s). */
const EXIT_MS = 500

function exitAnimationMs() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 0
  if (document.documentElement.hasAttribute('data-disable-animations')) return 0
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 0
  return EXIT_MS
}

let idCount = 0

export function isToastStatusIcon(value: string): value is ToastStatusIcon {
  return (TOAST_STATUS_ICONS as readonly string[]).includes(value)
}

function resolvePromiseMessage<T>(message: ToastPromiseMessage<T>, value?: T): AddToastOptions {
  const resolved = typeof message === 'function' ? message(value as T) : message
  return typeof resolved === 'string' ? { description: resolved } : resolved
}

type TimerEntry = {
  handle?: ReturnType<typeof setTimeout>
  start: number
  delay: number
  remaining: number
  callback: () => void
}

function applyLimited(list: ToastData[], limit: number): ToastData[] {
  let activeIndex = 0
  return list.map((toast) => {
    if (toast.closing) return toast
    const limited = activeIndex >= limit
    activeIndex += 1
    if (toast.limited === limited) return toast
    return { ...toast, limited }
  })
}

export function createToastManager(options: ToastManagerOptions = {}): ToastManager {
  let items = $state<ToastData[]>([])
  let timeout = $state(options.timeout ?? DEFAULT_TIMEOUT)
  let limit = $state(options.limit ?? DEFAULT_LIMIT)
  let timersPaused = false
  const timers = new Map<string, TimerEntry>()
  const exitTimers = new Map<string, ReturnType<typeof setTimeout>>()

  function setItems(next: ToastData[]) {
    items = applyLimited(next, limit)
  }

  function clearDismissTimer(id: string) {
    const timer = timers.get(id)
    if (!timer) return
    if (timer.handle) clearTimeout(timer.handle)
    timers.delete(id)
    if (timers.size === 0) timersPaused = false
  }

  function clearExitTimer(id: string) {
    const handle = exitTimers.get(id)
    if (!handle) return
    clearTimeout(handle)
    exitTimers.delete(id)
  }

  function scheduleDismiss(id: string, delay: number) {
    clearDismissTimer(id)
    if (delay <= 0) return
    const current = items.find((toast) => toast.id === id)
    if (!current || current.closing || current.type === 'loading') return
    const start = Date.now()
    const entry: TimerEntry = {
      start,
      delay,
      remaining: delay,
      callback: () => close(id),
    }
    if (!timersPaused) {
      entry.handle = setTimeout(() => {
        timers.delete(id)
        if (timers.size === 0) timersPaused = false
        close(id)
      }, delay)
    }
    timers.set(id, entry)
  }

  function scheduleExit(id: string) {
    clearExitTimer(id)
    const ms = exitAnimationMs()
    if (ms <= 0) {
      remove(id)
      return
    }
    exitTimers.set(
      id,
      setTimeout(() => {
        exitTimers.delete(id)
        remove(id)
      }, ms),
    )
  }

  function close(id?: string, swipeDirection?: ToastSwipeAxis) {
    if (id === undefined) {
      const closingIds = items.filter((toast) => !toast.closing).map((toast) => toast.id)
      if (closingIds.length === 0) return
      for (const toast of items) {
        if (!toast.closing) toast.onClose?.()
      }
      for (const toastId of closingIds) {
        clearDismissTimer(toastId)
      }
      setItems(
        items.map((toast) =>
          toast.closing ? toast : { ...toast, closing: true, height: 0, swipeDirection: undefined },
        ),
      )
      for (const toastId of closingIds) scheduleExit(toastId)
      return
    }

    const current = items.find((toast) => toast.id === id)
    if (!current || current.closing) return
    clearDismissTimer(id)
    current.onClose?.()
    setItems(
      items.map((toast) =>
        toast.id === id
          ? { ...toast, closing: true, height: 0, swipeDirection: swipeDirection ?? toast.swipeDirection }
          : toast,
      ),
    )
    scheduleExit(id)
  }

  function remove(id: string) {
    clearDismissTimer(id)
    clearExitTimer(id)
    const current = items.find((toast) => toast.id === id)
    if (!current) return
    current.onRemove?.()
    setItems(items.filter((toast) => toast.id !== id))
  }

  function add(addOptions: AddToastOptions) {
    const id = addOptions.id ?? `toast-${++idCount}`
    const existing = items.find((toast) => toast.id === id)
    if (existing) {
      if (existing.closing) {
        remove(id)
      } else {
        update(id, addOptions, { resetTimer: true, bumpKey: true })
        return id
      }
    }
    const toast: ToastData = { ...addOptions, id, updateKey: 0 }
    setItems([toast, ...items])
    const duration = toast.timeout ?? timeout
    if (toast.type !== 'loading' && duration > 0) {
      scheduleDismiss(id, duration)
    }
    return id
  }

  function update(
    id: string,
    updateOptions: Partial<AddToastOptions>,
    flags: { resetTimer?: boolean; bumpKey?: boolean } = {},
  ) {
    const current = items.find((toast) => toast.id === id)
    if (!current || current.closing) return
    const next: ToastData = {
      ...current,
      ...updateOptions,
      id,
      closing: current.closing,
      limited: current.limited,
      height: current.height,
      swipeDirection: current.swipeDirection,
      updateKey: flags.bumpKey ? (current.updateKey ?? 0) + 1 : current.updateKey,
    }
    setItems(items.map((toast) => (toast.id === id ? next : toast)))
    const nextTimeout = next.timeout ?? timeout
    const shouldHaveTimer = next.type !== 'loading' && nextTimeout > 0
    const timeoutChanged = Object.hasOwn(updateOptions, 'timeout') || current.type === 'loading'
    if (!shouldHaveTimer) {
      clearDismissTimer(id)
      return
    }
    if (flags.resetTimer || timeoutChanged || !timers.has(id)) {
      scheduleDismiss(id, nextTimeout)
    }
  }

  function promise<T>(work: Promise<T>, messages: ToastPromiseMessages<T>): Promise<T> {
    const loading = resolvePromiseMessage(messages.loading)
    const id = add({ timeout: 0, ...loading, type: loading.type ?? 'loading' })
    return work.then(
      (value) => {
        const success = resolvePromiseMessage(messages.success, value)
        update(
          id,
          { timeout, ...success, type: success.type ?? 'success' },
          { resetTimer: true, bumpKey: true },
        )
        return value
      },
      (error: unknown) => {
        const failed = resolvePromiseMessage(messages.error, error)
        update(
          id,
          { timeout, ...failed, type: failed.type ?? 'error' },
          { resetTimer: true, bumpKey: true },
        )
        throw error
      },
    )
  }

  function pauseTimers() {
    if (timersPaused) return
    timersPaused = true
    const now = Date.now()
    for (const timer of timers.values()) {
      if (!timer.handle) continue
      clearTimeout(timer.handle)
      timer.handle = undefined
      timer.remaining = Math.max(timer.remaining - (now - timer.start), 0)
    }
  }

  function resumeTimers() {
    if (!timersPaused) return
    timersPaused = false
    const now = Date.now()
    for (const [id, timer] of timers) {
      timer.remaining = timer.remaining > 0 ? timer.remaining : timer.delay
      timer.start = now
      timer.handle = setTimeout(() => {
        timers.delete(id)
        if (timers.size === 0) timersPaused = false
        timer.callback()
      }, timer.remaining)
    }
  }

  function setHeight(id: string, height: number) {
    const current = items.find((toast) => toast.id === id)
    if (!current || current.closing || current.height === height) return
    items = items.map((toast) => (toast.id === id ? { ...toast, height } : toast))
  }

  function configure(next: ToastManagerOptions) {
    if (next.timeout !== undefined && next.timeout !== timeout) timeout = next.timeout
    if (next.limit !== undefined && next.limit !== limit) {
      limit = next.limit
      items = applyLimited(items, limit)
    }
  }

  return {
    get toasts() {
      return items
    },
    get timeout() {
      return timeout
    },
    get limit() {
      return limit
    },
    get timersPaused() {
      return timersPaused
    },
    add,
    close,
    remove,
    update,
    promise,
    pauseTimers,
    resumeTimers,
    setHeight,
    configure,
  }
}

export function setToastManager(manager: ToastManager) {
  setContext(KEY, manager)
}

export function useToastManager(): ToastManager {
  const ctx = getContext<ToastManager>(KEY)
  if (!ctx) {
    throw new Error('useToastManager must be used within <ToastProvider>')
  }
  return ctx
}
