import { getContext, setContext } from 'svelte'

export type ComboboxSize = 'sm' | 'md' | 'lg'
export type ComboboxVariant = 'outline' | 'soft'

export interface ComboboxContextValue {
  size: ComboboxSize
  variant: ComboboxVariant
  clearable: boolean
  icon: boolean
  grid: boolean
  multiple: boolean
  hasItems: () => boolean
  filteredItems: () => readonly unknown[]
  isEmpty: () => boolean
  stringify: (item: unknown) => string
  inputValue: () => string
  setInputValue: (next: string) => void
  isOpen: () => boolean
  cols: () => number
  setCols: (cols: number) => void
  hasValue: () => boolean
  clear: () => void
  remove: (item: string) => void
  selected: () => string | string[]
  toggle: () => void
}

export interface ComboboxGroupContextValue {
  items: () => readonly unknown[]
}

const KEY = Symbol('appica-combobox')
const GROUP_KEY = Symbol('appica-combobox-group')

export function setComboboxContext(value: ComboboxContextValue) {
  setContext(KEY, value)
}

export function getComboboxContext(): ComboboxContextValue {
  const ctx = getContext<ComboboxContextValue>(KEY)
  if (!ctx) {
    throw new Error('Combobox sub-components must be rendered inside <Combobox>')
  }
  return ctx
}

export function setComboboxGroupContext(value: ComboboxGroupContextValue) {
  setContext(GROUP_KEY, value)
}

export function getComboboxGroupContext(): ComboboxGroupContextValue {
  const ctx = getContext<ComboboxGroupContextValue>(GROUP_KEY)
  if (!ctx) {
    throw new Error('ComboboxCollection must be rendered inside <ComboboxGroup>')
  }
  return ctx
}
