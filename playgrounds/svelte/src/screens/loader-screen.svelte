<script lang="ts">
  import { Loader } from '@appica/ui-svelte'
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Loader</h2>
  <div class="flex flex-wrap items-center gap-6">
    <Loader />
    <Loader variant="dots" />
    <Loader currentColor class="text-error" />
    <Loader variant="dots" currentColor class="text-success" />
  </div>
</section>
