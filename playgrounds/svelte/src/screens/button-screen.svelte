<script lang="ts">
  import { Button, DirectionProvider, Spinner, Switch, buttonVariants } from '@appica/ui-svelte'

  const variants = ['primary', 'primary-outline', 'secondary', 'soft', 'outline', 'ghost', 'destructive'] as const
  const sizes = ['sm', 'md', 'lg'] as const
  const iconSizes = ['icon-sm', 'icon-md', 'icon-lg'] as const

  let loading = $state(false)
  let dir: 'ltr' | 'rtl' = $state('ltr')

  function fakeSave() {
    loading = true
    setTimeout(() => {
      loading = false
    }, 1200)
  }
</script>

{#snippet plusIcon()}
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
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Button</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="flex flex-wrap items-center gap-3">
      {#each variants as variant (variant)}
        <Button {variant}>{variant}</Button>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-center gap-3">
      {#each sizes as size (size)}
        <Button {size}>{size}</Button>
      {/each}
      {#each iconSizes as size (size)}
        <Button {size} variant="outline" aria-label={size}>{@render plusIcon()}</Button>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">With an icon</p>
    <div class="flex flex-wrap items-center gap-3">
      <Button>{@render plusIcon()} New project</Button>
      <Button variant="outline">{@render plusIcon()} New project</Button>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Loading</p>
    <Button onclick={fakeSave} disabled={loading} focusableWhenDisabled>
      {#if loading}
        <Spinner currentColor class="size-4" />
        Saving
      {:else}
        Save
      {/if}
    </Button>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">As a link</p>
    <a href="#button" class={buttonVariants({ variant: 'outline' })}>Open docs</a>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <div class="flex flex-wrap items-center gap-3">
      <Button disabled>Primary</Button>
      <Button variant="outline" disabled>Outline</Button>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="flex flex-wrap items-center gap-3">
        <Button>{@render plusIcon()} New project</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </DirectionProvider>
  </div>
</section>
