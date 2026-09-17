<script lang="ts">
  import { DirectionProvider, Switch, Toggle, buttonVariants } from '@appica/ui-svelte'

  let enabled = $state(true)
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

{#snippet boldIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 12h9a4 4 0 0 1 0 8H6V4h8a4 4 0 0 1 0 8" />
  </svg>
{/snippet}
{#snippet italicIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M19 4h-9" />
    <path d="M14 20H5" />
    <path d="m15 4-6 16" />
  </svg>
{/snippet}
{#snippet underlineIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
    <path d="M4 20h16" />
  </svg>
{/snippet}
{#snippet bellIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
  </svg>
{/snippet}
{#snippet bellOffIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    <path d="M18.7 14A17 17 0 0 0 18 8" />
    <path d="M6.3 6.3A6 6 0 0 0 6 8c0 7-3 9-3 9h14" />
    <path d="m2 2 20 20" />
  </svg>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Toggle</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Composing with Button</p>
    <div class="flex items-center gap-2">
      <Toggle defaultPressed aria-label="Bold" class={buttonVariants({ variant: 'outline', size: 'icon-md' })}>
        {@render boldIcon()}
      </Toggle>
      <Toggle aria-label="Italic" class={buttonVariants({ variant: 'outline', size: 'icon-md' })}>
        {@render italicIcon()}
      </Toggle>
      <Toggle aria-label="Underline" class={buttonVariants({ variant: 'outline', size: 'icon-md' })}>
        {@render underlineIcon()}
      </Toggle>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">States</p>
    <div class="flex flex-wrap items-center gap-3">
      <Toggle aria-label="Off" class={buttonVariants({ variant: 'outline', size: 'md' })}>Off</Toggle>
      <Toggle defaultPressed aria-label="Pressed" class={buttonVariants({ variant: 'outline', size: 'md' })}>Pressed</Toggle>
      <Toggle disabled aria-label="Disabled" class={buttonVariants({ variant: 'outline', size: 'md' })}>Disabled</Toggle>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Controlled</p>
    <div class="flex w-full max-w-74 items-center justify-between gap-4 rounded-xl border p-4">
      <div class="flex flex-col gap-0.5">
        <span class="text-foreground-intense text-sm font-medium">Notifications</span>
        <span class="text-foreground-muted text-xs">
          {enabled ? "You'll be notified about new activity" : 'All notifications are paused'}
        </span>
      </div>
      <Toggle
        pressed={enabled}
        onPressedChange={(next) => (enabled = next)}
        aria-label={enabled ? 'Mute notifications' : 'Enable notifications'}
        class={buttonVariants({ variant: enabled ? 'primary' : 'soft', size: 'icon-md' })}
      >
        {#if enabled}
          {@render bellIcon()}
        {:else}
          {@render bellOffIcon()}
        {/if}
      </Toggle>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="flex items-center gap-2">
        <Toggle defaultPressed aria-label="Bold" class={buttonVariants({ variant: 'outline', size: 'icon-md' })}>
          {@render boldIcon()}
        </Toggle>
        <Toggle aria-label="Italic" class={buttonVariants({ variant: 'outline', size: 'icon-md' })}>
          {@render italicIcon()}
        </Toggle>
      </div>
    </DirectionProvider>
  </div>
</section>
