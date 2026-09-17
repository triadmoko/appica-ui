import { getContext, setContext } from 'svelte'

const KEY = Symbol('appica-collapsible')

export interface CollapsibleContextValue {
  open: boolean
}

export function setCollapsibleContext(value: CollapsibleContextValue) {
  setContext(KEY, value)
}

export function getCollapsibleContext(): CollapsibleContextValue {
  return getContext<CollapsibleContextValue>(KEY)
}
