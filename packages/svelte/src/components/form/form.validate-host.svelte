<script lang="ts">
  import Field from '../field/field.svelte'
  import FieldError from '../field/field-error.svelte'
  import FieldLabel from '../field/field-label.svelte'
  import Input from '../input/input.svelte'
  import Form from './form.svelte'
  import type { FormValues } from './form-context'

  let { onFormSubmit }: { onFormSubmit?: (values: FormValues) => void } = $props()
</script>

<Form aria-label="signup" {onFormSubmit}>
  <Field
    name="email"
    validate={(value) => {
      const email = String(value ?? '').trim()
      return email ? null : 'Email is required'
    }}
  >
    <FieldLabel>Email</FieldLabel>
    <Input type="email" />
    <FieldError />
  </Field>
  <button type="submit">Submit</button>
</Form>
