<script lang="ts">
  import { RangeCalendar as BitsRangeCalendar } from 'bits-ui'
  import { cn } from '../../internal/utils'
  import CalendarChevron from './calendar-chevron.svelte'
  import {
    DAY_BUTTON_BASE,
    HEADER_GAP,
    MONTH_GAP,
    NAV_BUTTON_CLASS,
    NEXT_CHEVRON_FLIP,
    PREV_CHEVRON_FLIP,
    ROOT_CONFIG,
    ROUNDED,
    ROW_GAP,
    SELECT_BASE,
    SELECT_CLASS,
    WEEKDAY_PADDING,
    type CalendarMonth,
    type CalendarSize,
  } from './calendar-tokens'

  let {
    size,
    months,
    weekdays,
  }: {
    size: CalendarSize
    months: CalendarMonth[]
    weekdays: string[]
  } = $props()

  const cfg = $derived(ROOT_CONFIG[size])
  const rounded = $derived(ROUNDED[size])
</script>

<BitsRangeCalendar.Header>
  {#snippet child({ props })}
    <div
      {...props}
      class={cn(
        'relative flex h-(--cell-size) items-center justify-center',
        MONTH_GAP[size],
        typeof props.class === 'string' ? props.class : undefined,
      )}
    >
      <BitsRangeCalendar.PrevButton class={cn(NAV_BUTTON_CLASS[size], 'pointer-events-auto absolute start-0', PREV_CHEVRON_FLIP)}>
        <CalendarChevron />
      </BitsRangeCalendar.PrevButton>
      <div class={cn('flex items-center', HEADER_GAP[size])}>
        <BitsRangeCalendar.MonthSelect monthFormat="short" aria-label="Month" class={cn(SELECT_BASE, SELECT_CLASS[size])} />
        <BitsRangeCalendar.YearSelect aria-label="Year" class={cn(SELECT_BASE, SELECT_CLASS[size])} />
      </div>
      <BitsRangeCalendar.NextButton class={cn(NAV_BUTTON_CLASS[size], 'pointer-events-auto absolute end-0', NEXT_CHEVRON_FLIP)}>
        <CalendarChevron />
      </BitsRangeCalendar.NextButton>
    </div>
  {/snippet}
</BitsRangeCalendar.Header>
<div class={cn('flex flex-col', MONTH_GAP[size])}>
  {#each months as month (month.value.toString())}
    <BitsRangeCalendar.Grid class="w-full border-collapse select-none" aria-label="Calendar">
      <BitsRangeCalendar.GridHead>
        <BitsRangeCalendar.GridRow class="flex" role="row">
          {#each weekdays as day, i (i)}
            <BitsRangeCalendar.HeadCell
              role="columnheader"
              class={cn(
                'text-foreground-muted flex flex-1 items-end justify-center font-normal',
                cfg.cellOuter,
                WEEKDAY_PADDING[size],
              )}
            >
              {day.slice(0, 2)}
            </BitsRangeCalendar.HeadCell>
          {/each}
        </BitsRangeCalendar.GridRow>
      </BitsRangeCalendar.GridHead>
      <BitsRangeCalendar.GridBody>
        {#each month.weeks as weekDates, weekIndex (weekIndex)}
          <BitsRangeCalendar.GridRow class={cn('flex w-full', ROW_GAP[size])} role="row">
            {#each weekDates as date (date.toString())}
              <BitsRangeCalendar.Cell
                {date}
                month={month.value}
                class={cn(
                  'relative flex aspect-square flex-1 items-center justify-center p-0',
                  cfg.cellOuter,
                  'data-range-start:bg-background-muted data-range-end:bg-background-muted data-range-middle:bg-background-muted',
                  size === 'sm' && 'data-range-start:rounded-s-xs data-range-end:rounded-e-xs',
                  size === 'md' && 'data-range-start:rounded-s-sm data-range-end:rounded-e-sm',
                  size === 'lg' && 'data-range-start:rounded-s-md data-range-end:rounded-e-md',
                )}
              >
                <BitsRangeCalendar.Day class={cn(DAY_BUTTON_BASE, rounded.full)} data-slot="calendar-day" />
              </BitsRangeCalendar.Cell>
            {/each}
          </BitsRangeCalendar.GridRow>
        {/each}
      </BitsRangeCalendar.GridBody>
    </BitsRangeCalendar.Grid>
  {/each}
</div>
