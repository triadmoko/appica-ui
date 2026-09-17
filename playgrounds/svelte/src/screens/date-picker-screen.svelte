<script lang="ts">
  import { CalendarDate, CalendarDateTime, type DateValue } from '@internationalized/date'
  import {
    DatePicker,
    DirectionProvider,
    Field,
    FieldError,
    FieldLabel,
    Switch,
    type DateRange,
  } from '@appica/ui-svelte'

  const today = new CalendarDate(2026, 8, 27)

  let picked = $state<DateValue | undefined>(today)
  let withTime = $state<DateValue | undefined>(new CalendarDateTime(2026, 8, 27, 14, 30))
  let trip = $state<DateRange | undefined>({
    from: new CalendarDate(2026, 8, 10),
    to: new CalendarDate(2026, 8, 17),
  })
  let many = $state<DateValue[] | undefined>([new CalendarDate(2026, 8, 12), new CalendarDate(2026, 8, 18)])
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">DatePicker</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Single</p>
    <Field class="max-w-sm">
      <FieldLabel>Date</FieldLabel>
      <DatePicker bind:value={picked} defaultMonth={today} />
    </Field>
    <p class="text-foreground-subtle text-xs">Value: {picked?.toString() ?? 'none'}</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">With time</p>
    <DatePicker class="max-w-sm" bind:value={withTime} showTime hourCycle={24} defaultMonth={today} />
    <p class="text-foreground-subtle text-xs">{withTime?.toString() ?? 'none'}</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Range</p>
    <DatePicker class="max-w-sm" mode="range" bind:value={trip} defaultMonth={today} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Multiple</p>
    <DatePicker
      class="max-w-sm"
      mode="multiple"
      bind:value={many}
      clearable
      placeholder="Pick dates"
      defaultMonth={today}
    />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled dates</p>
    <DatePicker
      class="max-w-sm"
      defaultMonth={today}
      disabledDates={[{ before: today }, { dayOfWeek: [0, 6] }]}
    />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Caption and months</p>
    <DatePicker
      class="max-w-sm"
      defaultMonth={today}
      captionLayout="dropdown"
      numberOfMonths={2}
      pagedNavigation
    />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled and error</p>
    <div class="flex max-w-sm flex-col gap-3">
      <DatePicker disabled defaultValue={today} />
      <Field invalid>
        <FieldLabel>Due date</FieldLabel>
        <DatePicker />
        <FieldError>Pick a date.</FieldError>
      </Field>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="max-w-sm">
        <DatePicker defaultMonth={today} defaultValue={today} />
      </div>
    </DirectionProvider>
  </div>
</section>
