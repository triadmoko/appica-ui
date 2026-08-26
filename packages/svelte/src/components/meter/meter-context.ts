import { getContext, setContext } from 'svelte'

export type MeterStatus = 'optimum' | 'suboptimum' | 'invalid'

export interface MeterStatusClassNames {
  optimum?: string
  suboptimum?: string
  invalid?: string
  default?: string
}

export interface MeterContextValue {
  value: () => number
  min: () => number
  max: () => number
  indicatorBg: () => string
  percent: () => number
  labelId: () => string | undefined
  setLabelId: (id: string | undefined) => void
}

const KEY = Symbol('appica-meter')

export function setMeterContext(value: MeterContextValue) {
  setContext(KEY, value)
}

export function getMeterContext(): MeterContextValue {
  const ctx = getContext<MeterContextValue>(KEY)
  if (!ctx) {
    throw new Error('Meter sub-components must be rendered inside <Meter>')
  }
  return ctx
}

export const DEFAULT_STATUS_CLASSES: Required<MeterStatusClassNames> = {
  optimum: 'bg-success-emphasis',
  suboptimum: 'bg-warning-emphasis',
  invalid: 'bg-error-emphasis',
  default: 'bg-primary',
}

export function percentOf(value: number, min: number, max: number): number {
  const span = max - min
  if (span === 0) return 0
  return Math.max(0, Math.min(100, ((value - min) / span) * 100))
}

export function formatPercent(value: number, min: number, max: number): string {
  return `${Math.round(percentOf(value, min, max))}%`
}

export function computeStatus(
  value: number,
  min: number,
  max: number,
  low: number | undefined,
  high: number | undefined,
  optimum: number | undefined,
): MeterStatus {
  const resolvedLow = low ?? min
  const resolvedHigh = high ?? max
  const resolvedOpt = optimum ?? (min + max) / 2

  const zone = (v: number): 0 | 1 | 2 => (v < resolvedLow ? 0 : v > resolvedHigh ? 2 : 1)

  const optZone = zone(resolvedOpt)
  const valZone = zone(value)

  if (valZone === optZone) return 'optimum'
  if (Math.abs(valZone - optZone) === 1) return 'suboptimum'
  return 'invalid'
}
