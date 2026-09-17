<script lang="ts">
  import type { HTMLFormAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { SvelteMap } from 'svelte/reactivity'
  import { cn } from '../../internal/utils'
  import {
    setFormContext,
    type FormErrors,
    type FormFieldHandle,
    type FormValues,
    type ValidationMode,
  } from './form-context'

  type Props = HTMLFormAttributes & {
    /**
     * Server-side errors keyed by field name. Consumed by Field.
     * @default {}
     */
    errors?: FormErrors
    /** Called when field errors should be cleared. Consumed by Field. */
    onClearErrors?: (errors: FormErrors) => void
    /**
     * Called on a valid submit with the collected `{ name: value }` map.
     * `preventDefault()` is called for you.
     */
    onFormSubmit?: (values: FormValues) => void
    /**
     * When fields validate. A Field's own `validationMode` takes precedence.
     * @default 'onSubmit'
     */
    validationMode?: ValidationMode
    children?: Snippet
  }

  type FormSubmitEvent = SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }

  let {
    class: className,
    errors = {},
    onClearErrors,
    onFormSubmit,
    validationMode = 'onSubmit',
    children,
    onsubmit,
    novalidate,
    ...rest
  }: Props = $props()

  let formEl: HTMLFormElement | undefined = $state()
  const fields = new SvelteMap<string, FormFieldHandle>()

  function registerField(field: FormFieldHandle) {
    fields.set(field.id, field)
    return () => {
      fields.delete(field.id)
    }
  }

  function getValues(): FormValues {
    const values: FormValues = {}
    if (formEl) {
      const data = new FormData(formEl)
      for (const [key, value] of data.entries()) {
        if (key in values) {
          const prev = values[key]
          values[key] = Array.isArray(prev) ? [...prev, value] : [prev, value]
        } else {
          values[key] = value
        }
      }
    }
    for (const field of fields.values()) {
      const name = field.name()
      if (name) values[name] = field.getValue()
    }
    return values
  }

  export async function validate(name?: string): Promise<boolean> {
    const values = getValues()
    if (name) {
      const field = [...fields.values()].find((entry) => entry.name() === name)
      if (!field) return true
      return field.validate(values)
    }
    const entries = [...fields.values()]
    const results = await Promise.all(entries.map((field) => field.validate(values)))
    return results.every(Boolean)
  }

  async function handleSubmit(event: SubmitEvent) {
    onsubmit?.(event as FormSubmitEvent)
    if (!onFormSubmit) return
    event.preventDefault()
    const values = getValues()
    const entries = [...fields.values()]
    const results = await Promise.all(entries.map((field) => field.validate(values)))
    if (results.some((ok) => !ok)) {
      const first = entries.find((_, index) => !results[index])
      first?.getElement()?.focus()
      return
    }
    onFormSubmit(values)
  }

  setFormContext({
    errors: () => errors,
    onClearErrors: () => onClearErrors,
    validationMode: () => validationMode,
    registerField,
    getValues,
  })
</script>

<form
  bind:this={formEl}
  data-slot="form"
  class={cn(className)}
  novalidate={novalidate ?? Boolean(onFormSubmit)}
  onsubmit={handleSubmit}
  {...rest}
>
  {@render children?.()}
</form>
