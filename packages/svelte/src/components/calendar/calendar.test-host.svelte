<script lang="ts">
  import { CalendarDate, type DateValue } from '@internationalized/date'
  import Calendar from './calendar.svelte'
  import type { CalendarSize, CalendarType, DateRange } from './calendar-tokens'

  let {
    type = 'single',
    size,
    value,
    defaultValue,
    placeholder = new CalendarDate(2026, 5, 15),
    onValueChange,
    disabled,
  }: {
    type?: CalendarType
    size?: CalendarSize
    value?: DateValue | DateValue[] | DateRange
    defaultValue?: DateValue | DateValue[] | DateRange
    placeholder?: DateValue
    onValueChange?: (value: DateValue | DateValue[] | DateRange | undefined) => void
    disabled?: boolean
  } = $props()
</script>

<Calendar {type} {size} {value} {defaultValue} {placeholder} {onValueChange} {disabled} />
