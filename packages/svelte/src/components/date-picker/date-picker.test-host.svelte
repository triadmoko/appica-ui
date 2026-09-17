<script lang="ts">
  import { CalendarDate, type DateValue } from '@internationalized/date'
  import Field from '../field/field.svelte'
  import FieldLabel from '../field/field-label.svelte'
  import DatePicker from './date-picker.svelte'
  import type { DatePickerMode } from './date-picker.svelte'
  import type { DateRange } from '../calendar/calendar-tokens'

  let {
    mode = 'single',
    showTime = false,
    defaultValue,
    value,
    onValueChange,
    defaultMonth = new CalendarDate(2026, 6, 10),
    defaultOpen,
    open,
    onOpenChange,
    closeOnSelect,
    name,
    disabled = false,
    invalid = false,
    clearable = false,
    placeholder,
    hourCycle,
  }: {
    mode?: DatePickerMode
    showTime?: boolean
    defaultValue?: DateValue | DateValue[] | DateRange
    value?: DateValue | DateValue[] | DateRange
    onValueChange?: (value: DateValue | DateValue[] | DateRange | undefined) => void
    defaultMonth?: DateValue
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    closeOnSelect?: boolean
    name?: string
    disabled?: boolean
    invalid?: boolean
    clearable?: boolean
    placeholder?: string
    hourCycle?: 12 | 24
  } = $props()
</script>

{#if invalid}
  <Field {invalid} {disabled} {name}>
    <FieldLabel>Date</FieldLabel>
    <DatePicker
      {mode}
      {showTime}
      {defaultValue}
      {value}
      {onValueChange}
      {defaultMonth}
      {defaultOpen}
      {open}
      {onOpenChange}
      {closeOnSelect}
      {name}
      {clearable}
      {placeholder}
      {hourCycle}
    />
  </Field>
{:else}
  <DatePicker
    {mode}
    {showTime}
    {defaultValue}
    {value}
    {onValueChange}
    {defaultMonth}
    {defaultOpen}
    {open}
    {onOpenChange}
    {closeOnSelect}
    {name}
    {disabled}
    {clearable}
    {placeholder}
    {hourCycle}
    aria-label="Date"
  />
{/if}
