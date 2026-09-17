<script lang="ts">
  import { CalendarDate, type DateValue } from '@internationalized/date'
  import { Calendar, DirectionProvider, Switch, type DateRange } from '@appica/ui-svelte'

  const today = new CalendarDate(2026, 8, 27)
  const sizes = ['sm', 'md', 'lg'] as const

  let day = $state<DateValue | undefined>(today)
  let range = $state<DateRange>({ from: new CalendarDate(2026, 8, 10), to: new CalendarDate(2026, 8, 20) })
  let days = $state<DateValue[]>([new CalendarDate(2026, 8, 12), new CalendarDate(2026, 8, 18)])
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Calendar</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Single</p>
    <Calendar mode="single" bind:selected={day} month={today} />
    <p class="text-foreground-subtle text-xs">{day?.toString() ?? 'none'}</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Range</p>
    <Calendar mode="range" bind:selected={range} month={today} />
    <p class="text-foreground-subtle text-xs">{range.from?.toString() ?? 'none'} - {range.to?.toString() ?? 'none'}</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Multiple</p>
    <Calendar mode="multiple" bind:selected={days} month={today} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled dates</p>
    <Calendar month={today} disabled={[{ before: today }, { dayOfWeek: [0, 6] }]} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Caption and months</p>
    <Calendar month={today} captionLayout="dropdown" numberOfMonths={2} pagedNavigation />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-start justify-center gap-6">
      {#each sizes as size (size)}
        <Calendar {size} month={today} captionLayout="label" />
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <Calendar mode="single" month={today} defaultSelected={today} />
      </div>
    </DirectionProvider>
  </div>
</section>
