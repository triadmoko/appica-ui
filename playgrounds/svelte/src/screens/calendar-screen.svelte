<script lang="ts">
  import { CalendarDate, type DateValue } from '@internationalized/date'
  import { Calendar, type DateRange } from '@appica/ui-svelte'

  const today = new CalendarDate(2026, 8, 27)

  let day = $state<DateValue | undefined>(today)
  let range = $state<DateRange>({ from: new CalendarDate(2026, 8, 10), to: new CalendarDate(2026, 8, 20) })
  let days = $state<DateValue[]>([new CalendarDate(2026, 8, 12), new CalendarDate(2026, 8, 18)])
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Calendar</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Single ({day?.toString() ?? 'none'})</p>
    <Calendar bind:value={day} placeholder={today} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">
      Range ({range.from?.toString() ?? 'none'} - {range.to?.toString() ?? 'none'})
    </p>
    <Calendar type="range" bind:value={range} placeholder={today} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">
      Multiple ({days.map((d) => d.toString()).join(', ') || 'none'})
    </p>
    <Calendar type="multiple" bind:value={days} placeholder={today} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Small</p>
    <Calendar size="sm" defaultValue={today} placeholder={today} />
  </div>
</section>
