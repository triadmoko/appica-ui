<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'
  import type { DateValue } from '@internationalized/date'
  import type { CalendarCaptionLayout, CalendarSize, CalendarType, DateRange } from './calendar-tokens'

  type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6

  export type CalendarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'placeholder'> & {
    /**
     * Cell size and text scale (Appica extension).
     * @default 'md'
     */
    size?: CalendarSize
    /**
     * Selection behavior. `range` uses a start/end pair.
     * @default 'single'
     */
    type?: CalendarType
    /** Controlled value. Shape matches `type`. Pair with `onValueChange` or `bind:value`. */
    value?: DateValue | DateValue[] | DateRange
    /** Uncontrolled initial value. */
    defaultValue?: DateValue | DateValue[] | DateRange
    /** Fires when the selection changes. The argument shape matches `type`. */
    onValueChange?: (value: DateValue | DateValue[] | DateRange | undefined) => void
    /** Visible month when no value is selected. Pair with `onPlaceholderChange` or `bind:placeholder`. */
    placeholder?: DateValue
    /** Fires when the visible month changes. */
    onPlaceholderChange?: (value: DateValue) => void
    /**
     * Month/year header: select dropdowns, or a static label with arrows.
     * @default 'dropdown'
     */
    captionLayout?: CalendarCaptionLayout
    /**
     * Render days from the adjacent months.
     * @default true
     */
    showOutsideDays?: boolean
    /**
     * How many months to display.
     * @default 1
     */
    numberOfMonths?: number
    /**
     * When several months are visible, jump by that count instead of one month.
     * @default false
     */
    pagedNavigation?: boolean
    /**
     * First day of the week. `0` is Sunday, `1` is Monday.
     * @default 1
     */
    weekStartsOn?: WeekStartsOn
    /** Locale used to format weekdays, months, and years. */
    locale?: string
    disabled?: boolean
    readonly?: boolean
    /**
     * Prevent clearing the selection by re-clicking the selected day.
     * @default false
     */
    required?: boolean
    /**
     * Earliest selectable date.
     * @default 1925-01-01
     */
    minValue?: DateValue
    /**
     * Latest selectable date.
     * @default 2050-12-31
     */
    maxValue?: DateValue
    /**
     * Always render six week rows.
     * @default false
     */
    fixedWeeks?: boolean
    /** Return true to block selection of a date. */
    isDateDisabled?: (date: DateValue) => boolean
    /** Return true to mark a date unavailable. */
    isDateUnavailable?: (date: DateValue) => boolean
  }
</script>

<script lang="ts">
  import { CalendarDate } from '@internationalized/date'
  import { untrack } from 'svelte'
  import { Calendar as BitsCalendar, RangeCalendar as BitsRangeCalendar } from 'bits-ui'
  import { asBitsAttrs, cn, commitBindableChange } from '../../internal/utils'
  import CalendarView from './calendar-view.svelte'
  import { ROOT_CONFIG, yearsInRange } from './calendar-tokens'

  type BitsDateRange = { start: DateValue | undefined; end: DateValue | undefined }

  const DEFAULT_MIN = new CalendarDate(1925, 1, 1)
  const DEFAULT_MAX = new CalendarDate(2050, 12, 31)

  let {
    class: className,
    size = 'md',
    type = 'single',
    value = $bindable(),
    defaultValue,
    onValueChange,
    placeholder = $bindable(),
    onPlaceholderChange,
    captionLayout = 'dropdown',
    showOutsideDays = true,
    numberOfMonths = 1,
    pagedNavigation = false,
    weekStartsOn = 1,
    locale,
    disabled,
    readonly,
    required = false,
    minValue = DEFAULT_MIN,
    maxValue = DEFAULT_MAX,
    fixedWeeks = false,
    isDateDisabled,
    isDateUnavailable,
    ...rest
  }: CalendarProps = $props()

  function isAppicaRange(next: DateValue | DateValue[] | DateRange | undefined): next is DateRange {
    return typeof next === 'object' && next !== null && !Array.isArray(next) && 'from' in next
  }

  function toSingle(next: DateValue | DateValue[] | DateRange | undefined): DateValue | undefined {
    if (next == null || Array.isArray(next)) return undefined
    if (isAppicaRange(next)) return next.from
    return next
  }

  function toMultiple(next: DateValue | DateValue[] | DateRange | undefined): DateValue[] {
    if (Array.isArray(next)) return next
    return []
  }

  function toBitsRange(next: DateValue | DateValue[] | DateRange | undefined): BitsDateRange {
    if (isAppicaRange(next)) {
      return { start: next.from, end: next.to }
    }
    return { start: undefined, end: undefined }
  }

  function fromBitsRange(next: BitsDateRange | undefined): DateRange {
    return { from: next?.start, to: next?.end }
  }

  let innerSingle = $state<DateValue | undefined>(undefined)
  let innerMultiple = $state<DateValue[]>([])
  let innerRange = $state<BitsDateRange>({ start: undefined, end: undefined })
  let innerPlaceholder = $state<DateValue | undefined>(undefined)

  innerSingle = untrack(() => toSingle(value ?? defaultValue))
  innerMultiple = untrack(() => toMultiple(value ?? defaultValue))
  innerRange = untrack(() => toBitsRange(value ?? defaultValue))
  innerPlaceholder = untrack(() => placeholder)

  $effect(() => {
    if (value === undefined) return
    if (type === 'multiple') innerMultiple = toMultiple(value)
    else if (type === 'range') innerRange = toBitsRange(value)
    else innerSingle = toSingle(value)
  })

  $effect(() => {
    if (placeholder !== undefined) innerPlaceholder = placeholder
  })

  function handlePlaceholderChange(next: DateValue) {
    commitBindableChange({
      next,
      bound: placeholder,
      setBound: (nextValue) => {
        placeholder = nextValue
      },
      setInner: (nextValue) => {
        innerPlaceholder = nextValue
      },
      onChange: onPlaceholderChange,
    })
  }

  function handleSingleChange(next: DateValue | undefined) {
    commitBindableChange({
      next,
      bound: value,
      setBound: (nextValue) => {
        value = nextValue
      },
      setInner: (nextValue) => {
        innerSingle = toSingle(nextValue)
      },
      onChange: onValueChange,
    })
  }

  function handleMultipleChange(next: DateValue[]) {
    commitBindableChange({
      next,
      bound: value,
      setBound: (nextValue) => {
        value = nextValue
      },
      setInner: (nextValue) => {
        innerMultiple = toMultiple(nextValue)
      },
      onChange: onValueChange,
    })
  }

  function handleRangeChange(next: BitsDateRange) {
    const mapped = fromBitsRange(next)
    commitBindableChange({
      next: mapped,
      bound: value,
      setBound: (nextValue) => {
        value = nextValue
      },
      setInner: (nextValue) => {
        innerRange = toBitsRange(nextValue)
      },
      onChange: onValueChange,
    })
  }

  const cfg = $derived(ROOT_CONFIG[size])
  const rootClasses = $derived(cn('inline-flex w-fit flex-col', cfg.text, cfg.cellVar, className))
  const years = $derived(yearsInRange(minValue, maxValue))

  const shared = $derived({
    weekStartsOn,
    locale,
    disabled,
    readonly,
    minValue,
    maxValue,
    fixedWeeks,
    isDateDisabled,
    isDateUnavailable,
    numberOfMonths,
    pagedNavigation,
    preventDeselect: required,
    weekdayFormat: 'short' as const,
    disableDaysOutsideMonth: !showOutsideDays,
  })

  const viewProps = $derived({
    size,
    captionLayout,
    showOutsideDays,
    locale,
    years,
  })
</script>

{#if type === 'range'}
  <BitsRangeCalendar.Root
    data-slot="calendar"
    class={rootClasses}
    bind:value={innerRange}
    bind:placeholder={innerPlaceholder}
    onValueChange={handleRangeChange}
    onPlaceholderChange={handlePlaceholderChange}
    {...shared}
    {...asBitsAttrs(rest)}
  >
    {#snippet children({ months, weekdays })}
      <CalendarView range {...viewProps} {months} {weekdays} />
    {/snippet}
  </BitsRangeCalendar.Root>
{:else if type === 'multiple'}
  <BitsCalendar.Root
    data-slot="calendar"
    class={rootClasses}
    type="multiple"
    bind:value={innerMultiple}
    bind:placeholder={innerPlaceholder}
    onValueChange={handleMultipleChange}
    onPlaceholderChange={handlePlaceholderChange}
    {...shared}
    {...asBitsAttrs(rest)}
  >
    {#snippet children({ months, weekdays })}
      <CalendarView {...viewProps} {months} {weekdays} />
    {/snippet}
  </BitsCalendar.Root>
{:else}
  <BitsCalendar.Root
    data-slot="calendar"
    class={rootClasses}
    type="single"
    bind:value={innerSingle}
    bind:placeholder={innerPlaceholder}
    onValueChange={handleSingleChange}
    onPlaceholderChange={handlePlaceholderChange}
    {...shared}
    {...asBitsAttrs(rest)}
  >
    {#snippet children({ months, weekdays })}
      <CalendarView {...viewProps} {months} {weekdays} />
    {/snippet}
  </BitsCalendar.Root>
{/if}
