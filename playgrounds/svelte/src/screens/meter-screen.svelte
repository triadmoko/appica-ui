<script lang="ts">
  import { Meter, MeterLabel, MeterProgress, MeterValue } from '@appica/ui-svelte'
</script>

<section class="flex flex-col gap-6">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Meter</h2>
  <Meter value={42}>
    <MeterLabel>Storage</MeterLabel>
    <MeterValue />
    <MeterProgress />
  </Meter>
  <Meter value={90} low={30} high={70} optimum={50}>
    <MeterLabel>Score</MeterLabel>
    <MeterValue />
    <MeterProgress />
  </Meter>
</section>
