<script lang="ts">
  import { Progress, ProgressLabel, ProgressValue } from '@appica/ui-svelte'
</script>

<section class="flex flex-col gap-6">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Progress</h2>
  <Progress value={40}>
    <ProgressLabel>Uploading</ProgressLabel>
    <ProgressValue />
  </Progress>
  <Progress value={75} variant="circular">
    <ProgressLabel>Syncing</ProgressLabel>
    <ProgressValue />
  </Progress>
</section>
