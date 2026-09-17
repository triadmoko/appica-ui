<script lang="ts">
  import Input from '../input/input.svelte'
  import Field from './field.svelte'
  import FieldError from './field-error.svelte'
  import FieldLabel from './field-label.svelte'
</script>

<Field validationMode="onBlur">
  <FieldLabel>Email</FieldLabel>
  <Input type="email" required />
  <FieldError match="valueMissing">Email is missing</FieldError>
</Field>
