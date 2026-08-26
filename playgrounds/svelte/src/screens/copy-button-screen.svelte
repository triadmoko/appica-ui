<script lang="ts">
  import { CopyButton, Input } from '@appica/ui-svelte'

  let field = $state('from the field')
  let lastCopied = $state('')
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-foreground-emphasis text-lg font-semibold">CopyButton</h2>
  <div class="flex flex-wrap items-center gap-3">
    <CopyButton value="pnpm add @appica/ui-svelte" onCopy={(text) => (lastCopied = text)} />
    <CopyButton value="pnpm add @appica/ui-svelte" size="md">Copy install</CopyButton>
    <CopyButton value={async () => 'computed-token'} label="Copy token" copiedLabel="Token copied" />
  </div>
  <div class="flex max-w-sm items-center gap-2">
    <Input bind:value={field} aria-label="Source field" />
    <CopyButton value={() => field} />
  </div>
  {#if lastCopied}
    <p class="text-foreground-muted text-sm">Last copied: {lastCopied}</p>
  {/if}
</section>
