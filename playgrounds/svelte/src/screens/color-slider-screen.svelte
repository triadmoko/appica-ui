<script lang="ts">
  import { ColorSlider, formatColor, parseColor } from '@appica/ui-svelte'

  let hue = $state(parseColor('hsb(210, 80%, 90%)'))
  let alpha = $state(parseColor('hsba(210, 80%, 90%, 0.5)'))
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">ColorSlider</h2>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">Hue ({formatColor(hue, 'hex')})</p>
    <ColorSlider channel="hue" bind:value={hue} />
  </div>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">Saturation</p>
    <ColorSlider channel="saturation" defaultValue="hsb(210, 80%, 90%)" />
  </div>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">Alpha</p>
    <ColorSlider channel="alpha" bind:value={alpha} />
  </div>

  <div class="flex h-48 flex-col gap-2">
    <p class="text-foreground-muted text-sm">Vertical hue</p>
    <ColorSlider channel="hue" orientation="vertical" defaultValue="hsb(120, 70%, 80%)" />
  </div>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <ColorSlider channel="hue" disabled defaultValue="hsb(30, 80%, 90%)" />
  </div>
</section>
