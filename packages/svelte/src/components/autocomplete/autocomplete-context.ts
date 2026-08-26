import { getContext, setContext } from 'svelte'

export type AutocompleteSize = 'sm' | 'md' | 'lg'
export type AutocompleteVariant = 'outline' | 'soft'

export interface AutocompleteContextValue {
  size: AutocompleteSize
  variant: AutocompleteVariant
  clearable: boolean
  icon: boolean
  grid: boolean
  multiple: boolean
  hasValue: () => boolean
  clear: () => void
  selected: () => string | string[]
  toggle: () => void
}

const KEY = Symbol('appica-autocomplete')

export function setAutocompleteContext(value: AutocompleteContextValue) {
  setContext(KEY, value)
}

export function getAutocompleteContext(): AutocompleteContextValue {
  const ctx = getContext<AutocompleteContextValue>(KEY)
  if (!ctx) {
    throw new Error('Autocomplete sub-components must be rendered inside <Autocomplete>')
  }
  return ctx
}
