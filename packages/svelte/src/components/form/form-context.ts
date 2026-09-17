import { getContext, setContext } from 'svelte'

export type FormErrors = Record<string, string | string[] | null | undefined>
export type FormValues = Record<string, unknown>
export type ValidationMode = 'onSubmit' | 'onBlur' | 'onChange'

export interface FormFieldHandle {
  id: string
  name: () => string | undefined
  getValue: () => unknown
  getElement: () => HTMLElement | null
  validate: (formValues: FormValues) => boolean | Promise<boolean>
}

export interface FormHandle {
  validate: (name?: string) => Promise<boolean>
}

export interface FormContextValue {
  errors: () => FormErrors
  onClearErrors: () => ((errors: FormErrors) => void) | undefined
  validationMode: () => ValidationMode
  registerField: (field: FormFieldHandle) => () => void
  getValues: () => FormValues
}

const KEY = Symbol('appica-form')

export function setFormContext(value: FormContextValue) {
  setContext(KEY, value)
}

export function getFormContext(): FormContextValue | undefined {
  return getContext<FormContextValue>(KEY)
}
