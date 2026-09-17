import { getContext, setContext } from 'svelte'

export type DialogModal = boolean | 'trap-focus'

export type DialogContextValue = {
  getModal: () => DialogModal
  getDisablePointerDismissal: () => boolean
}

const KEY = Symbol('appica-dialog')

export function setDialogContext(value: DialogContextValue) {
  setContext(KEY, value)
}

export function getDialogContext(): DialogContextValue | undefined {
  return getContext<DialogContextValue>(KEY)
}
