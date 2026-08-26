<script lang="ts">
  import { Skeleton } from '@appica/ui-svelte'
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Skeleton</h2>
  <Skeleton class="h-4 w-40" />
  <Skeleton effect="pulse" class="h-10 w-56" />
  <Skeleton effect="none" class="h-20 w-full max-w-sm" />
</section>
