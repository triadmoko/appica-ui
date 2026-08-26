import { getContext, setContext } from 'svelte'

export type ProgressVariant = 'bar' | 'circular'

export interface ProgressContextValue {
  value: () => number | null
  min: () => number
  max: () => number
  labelId: () => string | undefined
  setLabelId: (id: string | undefined) => void
}

const KEY = Symbol('appica-progress')

export function setProgressContext(value: ProgressContextValue) {
  setContext(KEY, value)
}

export function getProgressContext(): ProgressContextValue {
  const ctx = getContext<ProgressContextValue>(KEY)
  if (!ctx) {
    throw new Error('Progress sub-components must be rendered inside <Progress>')
  }
  return ctx
}

export function percentOf(value: number | null, min: number, max: number): number {
  if (value == null) return 0
  const span = max - min
  if (span === 0) return 0
  return Math.max(0, Math.min(100, ((value - min) / span) * 100))
}

export function formatPercent(value: number | null, min: number, max: number): string {
  if (value == null) return ''
  return `${Math.round(percentOf(value, min, max))}%`
}
