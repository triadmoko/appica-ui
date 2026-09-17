<script lang="ts">
  import Field from '../field/field.svelte'
  import FieldError from '../field/field-error.svelte'
  import FieldLabel from '../field/field-label.svelte'
  import Input from '../input/input.svelte'
  import Form from './form.svelte'
  import type { FormErrors, FormValues } from './form-context'

  let {
    ariaLabel = 'signup',
    errors,
    onsubmit,
    onFormSubmit,
    useFields = false,
  }: {
    ariaLabel?: string
    errors?: FormErrors
    onsubmit?: (event: SubmitEvent) => void
    onFormSubmit?: (values: FormValues) => void
    useFields?: boolean
  } = $props()
</script>

<Form aria-label={ariaLabel} {errors} {onsubmit} {onFormSubmit}>
  {#if useFields}
    <Field name="email">
      <FieldLabel>Email</FieldLabel>
      <Input type="email" />
      <FieldError />
    </Field>
    <Field name="name">
      <FieldLabel>Name</FieldLabel>
      <Input />
    </Field>
  {:else}
    <label>
      Email
      <input type="email" name="email" value="" />
    </label>
  {/if}
  <button type="submit">Submit</button>
</Form>
