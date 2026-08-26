<script lang="ts">
  import { Button, ButtonGroup } from '@appica/ui-svelte'
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-foreground-emphasis text-lg font-semibold">ButtonGroup</h2>
  <ButtonGroup variant="outline">
    <Button>Left</Button>
    <Button>Center</Button>
    <Button>Right</Button>
  </ButtonGroup>
  <ButtonGroup variant="primary" size="sm" orientation="vertical">
    <Button>Top</Button>
    <Button>Middle</Button>
    <Button>Bottom</Button>
  </ButtonGroup>
</section>
