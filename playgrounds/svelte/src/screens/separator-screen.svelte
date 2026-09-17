<script lang="ts">
  import { DirectionProvider, Separator, Switch } from '@appica/ui-svelte'

  const VARIANTS = ['solid', 'dashed', 'dotted', 'double', 'gradient', 'wave', 'zigzag'] as const
  const COLORS = [
    { label: 'text-border (default)', class: 'text-border' },
    { label: 'text-border-strong', class: 'text-border-strong' },
    { label: 'text-border-intense', class: 'text-border-intense' },
    { label: 'text-primary', class: 'text-primary' },
    { label: 'text-secondary', class: 'text-secondary' },
    { label: 'text-error', class: 'text-error' },
    { label: 'text-success', class: 'text-success' },
    { label: 'text-warning', class: 'text-warning' },
    { label: 'text-info', class: 'text-info' },
  ] as const

  let dir: 'ltr' | 'rtl' = $state('ltr')
  let playgroundOrientation: 'horizontal' | 'vertical' = $state('horizontal')
  let playgroundVariant: (typeof VARIANTS)[number] = $state('solid')
  let playgroundColor = $state('text-border')
</script>

{#snippet inContext()}
  <div class="border-border w-full max-w-sm rounded-xl border p-5">
    <div class="flex flex-col gap-1">
      <h3 class="text-foreground-intense font-medium">Mia Carter</h3>
      <p class="text-foreground-muted text-sm">Product designer based in Lisbon.</p>
    </div>
    <Separator class="my-4" />
    <div class="flex justify-between text-sm">
      <div>
        <span class="font-semibold">248</span> posts
      </div>
      <Separator orientation="vertical" class="mx-2.5" />
      <div>
        <span class="font-semibold">12.4k</span> followers
      </div>
      <Separator orientation="vertical" class="mx-2.5" />
      <div>
        <span class="font-semibold">312</span> following
      </div>
    </div>
  </div>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Separator</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Playground</p>
    <div class="flex flex-wrap items-center gap-3 text-sm">
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">Orientation</span>
        <select
          bind:value={playgroundOrientation}
          class="border-border bg-background rounded-md border px-2 py-1"
        >
          <option value="horizontal">horizontal</option>
          <option value="vertical">vertical</option>
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">Variant</span>
        <select bind:value={playgroundVariant} class="border-border bg-background rounded-md border px-2 py-1">
          {#each VARIANTS as variant (variant)}
            <option value={variant}>{variant}</option>
          {/each}
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">Color</span>
        <select bind:value={playgroundColor} class="border-border bg-background rounded-md border px-2 py-1">
          {#each COLORS as color (color.class)}
            <option value={color.class}>{color.label}</option>
          {/each}
        </select>
      </label>
    </div>
    {#if playgroundOrientation === 'horizontal'}
      <div class="flex w-full max-w-xs flex-col items-center gap-4 py-6">
        <span class="text-foreground-muted text-sm">Above the line</span>
        <Separator variant={playgroundVariant} class={playgroundColor} />
        <span class="text-foreground-muted text-sm">Below the line</span>
      </div>
    {:else}
      <div class="text-foreground flex h-16 items-center justify-center gap-4 text-sm">
        <span>Left of the line</span>
        <Separator variant={playgroundVariant} orientation="vertical" class={playgroundColor} />
        <span>Right of the line</span>
      </div>
    {/if}
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Usage</p>
    <div class="w-full max-w-xs">
      <Separator />
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="flex w-full max-w-xs flex-col gap-5">
      {#each VARIANTS as variant (variant)}
        <div class="flex flex-col gap-2">
          <span class="text-sm capitalize">{variant}</span>
          <Separator {variant} />
        </div>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Colors</p>
    <div class="flex w-full max-w-xs flex-col gap-5">
      {#each COLORS as color (color.class)}
        <div class="flex flex-col gap-2">
          <span class="text-sm">{color.label}</span>
          <Separator class={color.class} />
        </div>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Vertical orientation</p>
    <div class="text-foreground flex h-5 items-center gap-4 text-sm">
      <span>Profile</span>
      <Separator orientation="vertical" />
      <span>Settings</span>
      <Separator orientation="vertical" />
      <span>Sign out</span>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Vertical variants</p>
    <div class="flex flex-wrap items-end gap-8">
      {#each VARIANTS as variant (variant)}
        <div class="flex flex-col items-center gap-2">
          <div class="flex h-16 min-h-0 items-stretch overflow-hidden">
            <Separator {variant} orientation="vertical" />
          </div>
          <span class="text-foreground-muted text-xs capitalize">{variant}</span>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">In context</p>
    {@render inContext()}
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="flex w-full max-w-sm flex-col gap-5">
        {@render inContext()}
        <div class="text-foreground flex h-5 items-center gap-4 text-sm">
          <span>Profile</span>
          <Separator orientation="vertical" />
          <span>Settings</span>
          <Separator orientation="vertical" />
          <span>Sign out</span>
        </div>
      </div>
    </DirectionProvider>
  </div>
</section>
