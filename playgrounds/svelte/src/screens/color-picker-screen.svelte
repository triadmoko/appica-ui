<script lang="ts">
  import {
    ColorPicker,
    ColorPickerInput,
    ColorSlider,
    ColorSwatchPicker,
    ColorSwatchPickerItem,
    formatColor,
    parseColor,
  } from '@appica/ui-svelte'

  const presets = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7']
  let color = $state(parseColor('#3b82f6'))
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">ColorPicker</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Popover</p>
    <ColorPicker defaultValue="#3b82f6" label="Fill" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Popover with alpha</p>
    <ColorPicker alpha defaultValue="#3b82f680" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Inline ({formatColor(color, 'hex')})</p>
    <ColorPicker bind:value={color} inline />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Custom panel</p>
    <ColorPicker inline defaultValue="#ef4444">
      <ColorSlider channel="hue" />
      <ColorPickerInput />
      <ColorSwatchPicker aria-label="Presets">
        {#each presets as swatch (swatch)}
          <ColorSwatchPickerItem color={swatch} />
        {/each}
      </ColorSwatchPicker>
    </ColorPicker>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Flush trigger</p>
    <ColorPicker variant="flush" label="Accent" defaultValue="#a855f7" />
  </div>
</section>
