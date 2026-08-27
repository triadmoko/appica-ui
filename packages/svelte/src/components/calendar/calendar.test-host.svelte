<script lang="ts">
  import { CalendarDate, type DateValue } from '@internationalized/date'
  import Calendar from './calendar.svelte'
  import type { CalendarCaptionLayout, CalendarSize, CalendarType, DateRange } from './calendar-tokens'

  let {
    type = 'single',
    size,
    value,
    defaultValue,
    placeholder = new CalendarDate(2026, 5, 15),
    onValueChange,
    captionLayout,
    showOutsideDays,
    numberOfMonths,
    required,
    disabled,
    isDateDisabled,
  }: {
    type?: CalendarType
    size?: CalendarSize
    value?: DateValue | DateValue[] | DateRange
    defaultValue?: DateValue | DateValue[] | DateRange
    placeholder?: DateValue
    onValueChange?: (value: DateValue | DateValue[] | DateRange | undefined) => void
    captionLayout?: CalendarCaptionLayout
    showOutsideDays?: boolean
    numberOfMonths?: number
    required?: boolean
    disabled?: boolean
    isDateDisabled?: (date: DateValue) => boolean
  } = $props()
</script>

<Calendar
  {type}
  {size}
  {value}
  {defaultValue}
  {placeholder}
  {onValueChange}
  {captionLayout}
  {showOutsideDays}
  {numberOfMonths}
  {required}
  {disabled}
  {isDateDisabled}
/>
