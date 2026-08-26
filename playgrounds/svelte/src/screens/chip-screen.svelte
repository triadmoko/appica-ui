<script lang="ts">
  import { Chip, ChipGroup } from '@appica/ui-svelte'
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Chip</h2>
  <ChipGroup variant="soft" size="md">
    <Chip>Filter</Chip>
    <Chip dismissible>Red</Chip>
    <Chip dismissible>Blue</Chip>
    <Chip href="#chip">Link</Chip>
  </ChipGroup>
</section>
