<script lang="ts">
  import { Countdown, CountdownSegment } from '@appica/ui-svelte'

  const targetDate = new Date(Date.now() + 2 * 86_400_000 + 5 * 3_600_000)
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Countdown</h2>
  <Countdown {targetDate} class="gap-2 text-2xl font-semibold" aria-label="Launch in">
    <CountdownSegment unit="days" />
    <span class="text-foreground-muted text-base font-normal">d</span>
    <CountdownSegment unit="hours" />
    <span class="text-foreground-muted text-base font-normal">h</span>
    <CountdownSegment unit="minutes" />
    <span class="text-foreground-muted text-base font-normal">m</span>
    <CountdownSegment unit="seconds" />
    <span class="text-foreground-muted text-base font-normal">s</span>
  </Countdown>
</section>
