import { getContext, setContext } from 'svelte'

export type PopoverModal = boolean | 'trap-focus'

export type PopoverContextValue = {
  getModal: () => PopoverModal
  titleId: string
  descriptionId: string
  isTitled: () => boolean
  setTitled: (value: boolean) => void
  isDescribed: () => boolean
  setDescribed: (value: boolean) => void
}

const KEY = Symbol('appica-popover')

export function setPopoverContext(value: PopoverContextValue) {
  setContext(KEY, value)
}

export function getPopoverContext(): PopoverContextValue | undefined {
  return getContext<PopoverContextValue>(KEY)
}
