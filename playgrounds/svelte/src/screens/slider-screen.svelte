<script lang="ts">
  import { DirectionProvider, Slider, Switch } from '@appica/ui-svelte'

  let volume = $state(40)
  let range = $state([20, 80])
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Slider</h2>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">Usage</p>
    <Slider bind:value={volume} thumbAriaLabel="Volume" />
    <p class="text-foreground-subtle text-xs">Volume: {volume}</p>
  </div>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">Range</p>
    <Slider bind:value={range} tooltipVisibility="always" thumbAriaLabel={(i) => (i === 0 ? 'Min' : 'Max')} />
    <p class="text-foreground-subtle text-xs">{range[0]}-{range[1]}</p>
  </div>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">No tooltip</p>
    <Slider defaultValue={50} tooltipVisibility="never" thumbAriaLabel="Level" />
  </div>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <Slider defaultValue={30} disabled thumbAriaLabel="Disabled volume" />
  </div>

  <div class="flex h-40 flex-col gap-2">
    <p class="text-foreground-muted text-sm">Vertical</p>
    <Slider orientation="vertical" defaultValue={60} thumbAriaLabel="Gain" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="max-w-xs">
        <Slider defaultValue={40} thumbAriaLabel="RTL volume" />
      </div>
    </DirectionProvider>
  </div>
</section>
