<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { getFormContext, type FormValues, type ValidationMode } from '../form/form-context'
  import {
    copyValidity,
    emptyValidity,
    setFieldContext,
    type FieldControlHandle,
    type FieldValidityBits,
    type FieldValidityState,
  } from './field-context'

  type ValidateResult = string | string[] | null | undefined

  export type FieldProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Mark the field as invalid. Also set when the parent Form has an error for `name`.
     * @default false
     */
    invalid?: boolean
    /**
     * Disable the label and descendant controls that read Field context.
     * @default false
     */
    disabled?: boolean
    /** Field name. Matches Form `errors` keys and is inherited by nested controls. */
    name?: string
    /** Returns error message(s) when invalid, or `null` when valid. May be async. */
    validate?: (value: unknown, formValues: FormValues) => ValidateResult | Promise<ValidateResult>
    /**
     * When `validate` runs. Falls back to the parent Form, then `onSubmit`.
     * @default 'onSubmit'
     */
    validationMode?: ValidationMode
    /**
     * Milliseconds to debounce `validate` in `onChange` mode.
     * @default 0
     */
    validationDebounceTime?: number
    /** Externally control whether the value differs from its initial value. */
    dirty?: boolean
    /** Externally control whether the field has been interacted with. */
    touched?: boolean
    children?: Snippet
  }

  let {
    class: className,
    invalid = false,
    disabled = false,
    name,
    validate,
    validationMode,
    validationDebounceTime = 0,
    dirty: dirtyProp,
    touched: touchedProp,
    children,
    ...rest
  }: FieldProps = $props()

  const uid = $props.id()
  const controlId = `field-${uid}-control`
  const labelId = `field-${uid}-label`
  const descriptionId = `field-${uid}-description`
  const errorId = `field-${uid}-error`

  const form = getFormContext()
  const mode = $derived(validationMode ?? form?.validationMode() ?? 'onSubmit')

  const formError = $derived.by(() => {
    if (!name || !form) return undefined
    const err = form.errors()[name]
    if (err == null || err === '') return undefined
    return Array.isArray(err) ? err[0] ?? undefined : err
  })

  let rootEl: HTMLDivElement | undefined = $state()
  let controlHandle: FieldControlHandle | null = $state(null)
  let customErrors = $state<string[]>([])
  let nativeValidity = $state<FieldValidityBits>(emptyValidity(null))
  let hasValidated = $state(false)
  let internalDirty = $state(false)
  let internalTouched = $state(false)
  let focused = $state(false)
  let currentValue = $state<unknown>('')
  let initialValue: unknown = undefined
  let debounceTimer: ReturnType<typeof setTimeout> | undefined

  const dirty = $derived(dirtyProp ?? internalDirty)
  const touched = $derived(touchedProp ?? internalTouched)
  const filled = $derived.by(() => {
    if (currentValue == null) return false
    if (typeof currentValue === 'string') return currentValue.length > 0
    if (Array.isArray(currentValue)) return currentValue.length > 0
    return Boolean(currentValue)
  })

  function discoverControl(): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null {
    if (!rootEl) return null
    return rootEl.querySelector(
      'input:not([type=hidden]):not([type=button]):not([type=submit]):not([type=reset]), textarea, select',
    )
  }

  function getControlValue(): unknown {
    if (controlHandle) return controlHandle.getValue()
    const el = discoverControl()
    if (!el) return ''
    if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
      return el.checked
    }
    return el.value
  }

  function getControlElement(): HTMLElement | null {
    return controlHandle?.getElement() ?? discoverControl()
  }

  function getControlValidity(): ValidityState | null {
    if (controlHandle) return controlHandle.getValidity()
    return discoverControl()?.validity ?? null
  }

  const customError = $derived(customErrors[0])
  const resolvedInvalid = $derived(
    invalid || Boolean(formError) || customErrors.length > 0 || (hasValidated && nativeValidity.valid === false),
  )

  function readValidity(): FieldValidityState {
    const error = formError ?? customError ?? ''
    return {
      validity: {
        ...nativeValidity,
        customError: customErrors.length > 0 || nativeValidity.customError,
        valid: hasValidated ? !resolvedInvalid : null,
      },
      value: currentValue,
      error,
      errors: formError ? [formError] : customErrors,
      valid: !resolvedInvalid,
      invalid: resolvedInvalid,
    }
  }

  async function runValidate(formValues?: FormValues): Promise<boolean> {
    hasValidated = true
    currentValue = getControlValue()
    const native = getControlValidity()
    nativeValidity = native ? copyValidity(native) : emptyValidity(true)

    let messages: string[] = []
    if (validate) {
      const values = formValues ?? form?.getValues() ?? (name ? { [name]: currentValue } : {})
      const result = await validate(currentValue, values)
      if (result != null && result !== '') {
        messages = Array.isArray(result) ? result.filter((message): message is string => Boolean(message)) : [result]
      }
    }

    customErrors = messages
    const nativeOk = native ? native.valid : true
    return messages.length === 0 && nativeOk && !invalid && !formError
  }

  export async function validateField(formValues?: FormValues): Promise<boolean> {
    return runValidate(formValues)
  }

  function registerControl(handle: FieldControlHandle) {
    controlHandle = handle
    currentValue = handle.getValue()
    if (initialValue === undefined) initialValue = currentValue
    return () => {
      if (controlHandle === handle) controlHandle = null
    }
  }

  function clearFormError() {
    if (!name || !form) return
    const onClear = form.onClearErrors()
    if (!onClear) return
    onClear({ ...form.errors(), [name]: null })
  }

  function reportChange() {
    currentValue = getControlValue()
    if (!internalDirty && currentValue !== initialValue) internalDirty = true
    clearFormError()
    if (mode !== 'onChange') return
    if (debounceTimer) clearTimeout(debounceTimer)
    if (validationDebounceTime > 0) {
      debounceTimer = setTimeout(() => {
        void runValidate()
      }, validationDebounceTime)
      return
    }
    void runValidate()
  }

  function reportBlur() {
    internalTouched = true
    if (mode === 'onBlur' || (mode === 'onChange' && !hasValidated)) {
      void runValidate()
    }
  }

  function reportFocus(next: boolean) {
    focused = next
  }

  $effect(() => {
    if (!form) return
    return form.registerField({
      id: uid,
      name: () => name,
      getValue: getControlValue,
      getElement: getControlElement,
      validate: runValidate,
    })
  })

  setFieldContext({
    invalid: () => resolvedInvalid,
    disabled: () => disabled,
    name: () => name,
    controlId,
    labelId,
    descriptionId,
    errorId,
    formError: () => formError ?? customError,
    clearFormError,
    registerControl,
    reportChange,
    reportBlur,
    reportFocus,
    validity: readValidity,
  })
</script>

<div
  bind:this={rootEl}
  data-slot="field"
  data-invalid={resolvedInvalid ? '' : undefined}
  data-valid={hasValidated && !resolvedInvalid ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  data-dirty={dirty ? '' : undefined}
  data-touched={touched ? '' : undefined}
  data-filled={filled ? '' : undefined}
  data-focused={focused ? '' : undefined}
  class={cn(className)}
  {...rest}
>
  {@render children?.()}
</div>
