<script lang="ts">
  import { CalendarDate, type DateValue } from '@internationalized/date'
  import Field from '../field/field.svelte'
  import FieldLabel from '../field/field-label.svelte'
  import DateField from './date-field.svelte'
  import type { DateFieldSize, DateFieldVariant } from './date-field.svelte'

  let {
    defaultValue,
    value,
    name,
    disabled = false,
    invalid = false,
    readonly = false,
    unstyled = false,
    size,
    variant,
    label = 'Date',
  }: {
    defaultValue?: DateValue
    value?: DateValue
    name?: string
    disabled?: boolean
    invalid?: boolean
    readonly?: boolean
    unstyled?: boolean
    size?: DateFieldSize
    variant?: DateFieldVariant
    label?: string
  } = $props()
</script>

{#if invalid}
  <Field {invalid} {name}>
    <FieldLabel>{label}</FieldLabel>
    <DateField {defaultValue} {value} {name} {disabled} {readonly} {unstyled} {size} {variant} />
  </Field>
{:else}
  <DateField {defaultValue} {value} {name} {disabled} {readonly} {unstyled} {size} {variant} aria-label={label} />
{/if}
