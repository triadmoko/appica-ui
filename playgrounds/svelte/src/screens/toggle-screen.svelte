<script lang="ts">
  import { DirectionProvider, Switch, Toggle, buttonVariants } from '@appica/ui-svelte'

  let bold = $state(false)
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Toggle</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Usage</p>
    <Toggle
      bind:pressed={bold}
      class={buttonVariants({ variant: 'outline', size: 'sm' })}
      aria-label="Bold"
    >
      Bold {bold ? 'on' : 'off'}
    </Toggle>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Default pressed</p>
    <Toggle class={buttonVariants({ variant: 'outline', size: 'sm' })} defaultPressed>Italic</Toggle>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <div class="flex flex-wrap items-center gap-2">
      <Toggle class={buttonVariants({ variant: 'outline', size: 'sm' })} disabled>Off</Toggle>
      <Toggle class={buttonVariants({ variant: 'outline', size: 'sm' })} disabled defaultPressed>On</Toggle>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <Toggle class={buttonVariants({ variant: 'outline', size: 'sm' })}>Bold</Toggle>
      </div>
    </DirectionProvider>
  </div>
</section>
