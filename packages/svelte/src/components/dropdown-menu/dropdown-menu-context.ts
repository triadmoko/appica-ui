import { getContext, setContext } from 'svelte'

export type DropdownMenuSize = 'sm' | 'md' | 'lg'
export type DropdownMenuOrientation = 'horizontal' | 'vertical'

export type DropdownMenuHoverConfig = {
  enabled: boolean
  delay: number
  closeDelay: number
}

export interface DropdownMenuContextValue {
  size: DropdownMenuSize
  orientation: DropdownMenuOrientation
  open: boolean
  disabled: boolean
  modal: boolean
  setOpen: (open: boolean) => void
  hoverEnter: () => void
  hoverLeave: () => void
  setHoverConfig: (config: DropdownMenuHoverConfig | null) => void
}

const KEY = Symbol('appica-dropdown-menu')

export function setDropdownMenuContext(value: DropdownMenuContextValue) {
  setContext(KEY, value)
}

export function getDropdownMenuContext(): DropdownMenuContextValue {
  const ctx = getContext<DropdownMenuContextValue>(KEY)
  if (!ctx) {
    throw new Error('DropdownMenu sub-components must be rendered inside <DropdownMenu>')
  }
  return ctx
}
