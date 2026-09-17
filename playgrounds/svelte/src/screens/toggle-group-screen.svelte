<script lang="ts">
  import { DirectionProvider, Switch, Toggle, ToggleGroup, buttonVariants } from '@appica/ui-svelte'

  let align = $state('left')
  let color = $state('blue')
  let dir: 'ltr' | 'rtl' = $state('ltr')

  const swatches = [
    { value: 'red', class: 'bg-red-500' },
    { value: 'blue', class: 'bg-blue-500' },
    { value: 'green', class: 'bg-green-500' },
  ]
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">ToggleGroup</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Single</p>
    <ToggleGroup bind:value={align} aria-label="Text alignment">
      <Toggle value="left" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Left</Toggle>
      <Toggle value="center" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Center</Toggle>
      <Toggle value="right" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Right</Toggle>
    </ToggleGroup>
    <p class="text-foreground-subtle text-xs">Selected: {align}</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Multiple</p>
    <ToggleGroup multiple defaultValue={['bold']} aria-label="Text style">
      <Toggle value="bold" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Bold</Toggle>
      <Toggle value="italic" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Italic</Toggle>
      <Toggle value="underline" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Underline</Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Vertical</p>
    <ToggleGroup orientation="vertical" defaultValue="sm" aria-label="Size">
      <Toggle value="sm" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>SM</Toggle>
      <Toggle value="md" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>MD</Toggle>
      <Toggle value="lg" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>LG</Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <ToggleGroup disabled defaultValue="left" aria-label="Disabled alignment">
      <Toggle value="left" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Left</Toggle>
      <Toggle value="center" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Center</Toggle>
      <Toggle value="right" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Right</Toggle>
    </ToggleGroup>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Color swatches</p>
    <ToggleGroup bind:value={color} aria-label="Color">
      {#each swatches as swatch (swatch.value)}
        <Toggle
          value={swatch.value}
          class={buttonVariants({ variant: 'ghost', size: 'icon-md' })}
          aria-label={swatch.value}
        >
          <span class={['size-4 rounded-full', swatch.class]}></span>
        </Toggle>
      {/each}
    </ToggleGroup>
    <p class="text-foreground-subtle text-xs">Selected: {color}</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <ToggleGroup defaultValue="left" aria-label="RTL alignment">
          <Toggle value="left" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Left</Toggle>
          <Toggle value="center" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Center</Toggle>
          <Toggle value="right" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Right</Toggle>
        </ToggleGroup>
      </div>
    </DirectionProvider>
  </div>
</section>
