<script lang="ts">
  import { DirectionProvider, Switch, Textarea } from '@appica/ui-svelte'

  const variants = ['outline', 'soft'] as const
  const sizes = ['sm', 'md', 'lg'] as const

  let notes = $state('Ship the Svelte port.')
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

{#snippet startIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="size-4"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Textarea</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="flex max-w-md flex-col gap-3">
      {#each variants as variant (variant)}
        <Textarea {variant} placeholder={variant} rows={3} />
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex max-w-md flex-col gap-3">
      {#each sizes as inputSize (inputSize)}
        <Textarea {inputSize} placeholder={inputSize} rows={3} />
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Start and end</p>
    <Textarea class="max-w-md" placeholder="Write a note" start={startIcon} rows={3} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Clearable</p>
    <Textarea class="max-w-md" clearable bind:value={notes} rows={3} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled, read-only, error</p>
    <div class="flex max-w-md flex-col gap-3">
      <Textarea disabled placeholder="Disabled" rows={3} />
      <Textarea readonly value="Read only notes" rows={3} />
      <Textarea aria-invalid="true" value="Too short." rows={3} />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="max-w-md">
        <Textarea placeholder="Write a note" start={startIcon} clearable rows={3} />
      </div>
    </DirectionProvider>
  </div>
</section>
