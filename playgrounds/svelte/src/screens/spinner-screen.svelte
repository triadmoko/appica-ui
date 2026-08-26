<script lang="ts">
  import { Spinner } from '@appica/ui-svelte'
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Spinner</h2>
  <div class="flex flex-wrap items-center gap-6">
    <Spinner />
    <Spinner variant="dots" />
    <Spinner variant="sparkle" />
    <Spinner currentColor class="text-error" />
  </div>
</section>
