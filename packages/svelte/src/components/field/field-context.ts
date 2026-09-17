import { getContext, setContext } from 'svelte'

export type FieldValidityBits = {
  badInput: boolean
  customError: boolean
  patternMismatch: boolean
  rangeOverflow: boolean
  rangeUnderflow: boolean
  stepMismatch: boolean
  tooLong: boolean
  tooShort: boolean
  typeMismatch: boolean
  valueMissing: boolean
  valid: boolean | null
}

export type FieldValidityState = {
  validity: FieldValidityBits
  value: unknown
  error: string
  errors: string[]
  valid: boolean
  invalid: boolean
}

export interface FieldControlHandle {
  getValue: () => unknown
  getElement: () => HTMLElement | null
  getValidity: () => ValidityState | null
}

export interface FieldContextValue {
  invalid: () => boolean
  disabled: () => boolean
  name: () => string | undefined
  controlId: string
  labelId: string
  descriptionId: string
  errorId: string
  formError: () => string | undefined
  clearFormError: () => void
  registerControl: (control: FieldControlHandle) => () => void
  reportChange: () => void
  reportBlur: () => void
  reportFocus: (focused: boolean) => void
  validity: () => FieldValidityState
}

type AriaInvalidValue = boolean | 'true' | 'false' | 'grammar' | 'spelling'

export interface MergedFieldControl {
  invalid: boolean
  disabled: boolean
  name: string | undefined
  id: string | undefined
  describedby: string | undefined
  ariaInvalid: AriaInvalidValue | undefined
}

const KEY = Symbol('appica-field')

export function emptyValidity(valid: boolean | null = null): FieldValidityBits {
  return {
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valueMissing: false,
    valid,
  }
}

export function copyValidity(validity: ValidityState, valid: boolean | null = validity.valid): FieldValidityBits {
  return {
    badInput: validity.badInput,
    customError: validity.customError,
    patternMismatch: validity.patternMismatch,
    rangeOverflow: validity.rangeOverflow,
    rangeUnderflow: validity.rangeUnderflow,
    stepMismatch: validity.stepMismatch,
    tooLong: validity.tooLong,
    tooShort: validity.tooShort,
    typeMismatch: validity.typeMismatch,
    valueMissing: validity.valueMissing,
    valid,
  }
}

export function setFieldContext(value: FieldContextValue) {
  setContext(KEY, value)
}

export function getFieldContext(): FieldContextValue | undefined {
  return getContext<FieldContextValue>(KEY)
}

export function requireFieldContext(): FieldContextValue {
  const ctx = getFieldContext()
  if (!ctx) {
    throw new Error('Field sub-components must be rendered inside <Field>')
  }
  return ctx
}

function toAriaInvalid(value: unknown, invalid: boolean): AriaInvalidValue | undefined {
  if (invalid) return true
  switch (value) {
    case true:
    case false:
    case 'true':
    case 'false':
    case 'grammar':
    case 'spelling':
      return value
    default:
      return undefined
  }
}

export function mergeFieldControl(opts: {
  field: FieldContextValue | undefined
  id?: string | null
  name?: string | null
  disabled?: boolean | null
  ariaInvalid?: unknown
  ariaDescribedby?: string | undefined | null
  /** Skip inheriting Field's control id (radio items, grouped controls). */
  omitId?: boolean
}): MergedFieldControl {
  const invalidFromAria = opts.ariaInvalid === true || opts.ariaInvalid === 'true'
  const invalid = invalidFromAria || Boolean(opts.field?.invalid())
  const disabled = opts.disabled ?? opts.field?.disabled() ?? false
  const name = opts.name ?? opts.field?.name()
  const id = opts.omitId ? (opts.id ?? undefined) : (opts.id ?? opts.field?.controlId)
  const describedParts = [
    opts.ariaDescribedby,
    opts.field?.descriptionId,
    invalid ? opts.field?.errorId : undefined,
  ].filter((part): part is string => Boolean(part))
  return {
    invalid,
    disabled,
    name,
    id,
    describedby: describedParts.length > 0 ? describedParts.join(' ') : undefined,
    ariaInvalid: toAriaInvalid(opts.ariaInvalid, invalid),
  }
}
