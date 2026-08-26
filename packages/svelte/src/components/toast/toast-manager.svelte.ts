import { getContext, setContext } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'

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

export type ToastData = {
  id: string
  title?: string
  description?: string
  timeout?: number
  /**
   * Opt this toast into a countdown bar, overriding the Toaster `progress` prop.
   */
  progress?: boolean
  data?: ToastPayload
  actionProps?: {
    children?: string
    onclick?: (event: MouseEvent) => void
  }
  /**
   * True while the exit animation is running. Set by `close()`, cleared by `remove()`.
   */
  closing?: boolean
}

export type AddToastOptions = Omit<ToastData, 'id' | 'closing'> & { id?: string }

export type ToastPromiseMessages<T = unknown> = {
  loading: AddToastOptions
  success: AddToastOptions | ((value: T) => AddToastOptions)
  error: AddToastOptions | ((error: unknown) => AddToastOptions)
}

export type ToastManager = {
  readonly toasts: ToastData[]
  add: (options: AddToastOptions) => string
  close: (id: string) => void
  /** Drop a toast immediately, skipping the exit animation. */
  remove: (id: string) => void
  update: (id: string, options: Partial<AddToastOptions>) => void
  promise: <T>(work: Promise<T>, messages: ToastPromiseMessages<T>) => Promise<T>
}

const KEY = Symbol('appica-toast-manager')
const DEFAULT_TIMEOUT = 5000
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

export function createToastManager(): ToastManager {
  let items = $state<ToastData[]>([])
  const timers = new SvelteMap<string, ReturnType<typeof setTimeout>>()

  function clearTimer(id: string) {
    const timer = timers.get(id)
    if (!timer) return
    clearTimeout(timer)
    timers.delete(id)
  }

  function scheduleTimeout(id: string, timeout: number) {
    clearTimer(id)
    if (timeout <= 0) return
    timers.set(
      id,
      setTimeout(() => {
        close(id)
      }, timeout),
    )
  }

  function close(id: string) {
    clearTimer(id)
    const current = items.find((toast) => toast.id === id)
    if (!current || current.closing) return
    items = items.map((toast) => (toast.id === id ? { ...toast, closing: true } : toast))
    timers.set(
      id,
      setTimeout(() => {
        remove(id)
      }, exitAnimationMs()),
    )
  }

  function remove(id: string) {
    clearTimer(id)
    items = items.filter((toast) => toast.id !== id)
  }

  function add(options: AddToastOptions) {
    const id = options.id ?? `toast-${++idCount}`
    const toast: ToastData = { ...options, id }
    items = [toast, ...items]
    scheduleTimeout(id, toast.timeout ?? DEFAULT_TIMEOUT)
    return id
  }

  function update(id: string, options: Partial<AddToastOptions>) {
    const current = items.find((toast) => toast.id === id)
    if (!current) return
    const next: ToastData = { ...current, ...options, id, closing: current.closing }
    items = items.map((toast) => (toast.id === id ? next : toast))
    if ('timeout' in options && !next.closing) {
      scheduleTimeout(id, next.timeout ?? DEFAULT_TIMEOUT)
    }
  }

  function resolveMessage<T>(
    message: AddToastOptions | ((value: T) => AddToastOptions),
    value: T,
  ): AddToastOptions {
    return typeof message === 'function' ? message(value) : message
  }

  function promise<T>(work: Promise<T>, messages: ToastPromiseMessages<T>): Promise<T> {
    const id = add({ ...messages.loading, timeout: 0 })
    return work.then(
      (value) => {
        update(id, { timeout: DEFAULT_TIMEOUT, ...resolveMessage(messages.success, value) })
        return value
      },
      (error: unknown) => {
        update(id, { timeout: DEFAULT_TIMEOUT, ...resolveMessage(messages.error, error) })
        throw error
      },
    )
  }

  return {
    get toasts() {
      return items
    },
    add,
    close,
    remove,
    update,
    promise,
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
