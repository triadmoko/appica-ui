<script lang="ts">
  import { ColorSwatchPicker, ColorSwatchPickerItem, formatColor, parseColor } from '@appica/ui-svelte'

  const palette = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899']
  let color = $state(parseColor('#3b82f6'))
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">ColorSwatchPicker</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Grid ({formatColor(color, 'hex')})</p>
    <ColorSwatchPicker bind:value={color} aria-label="Brand color">
      {#each palette as swatch (swatch)}
        <ColorSwatchPickerItem color={swatch} />
      {/each}
    </ColorSwatchPicker>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Stack, circle</p>
    <ColorSwatchPicker layout="stack" shape="circle" defaultValue="#22c55e" aria-label="Accent">
      {#each palette.slice(0, 4) as swatch (swatch)}
        <ColorSwatchPickerItem color={swatch} />
      {/each}
    </ColorSwatchPicker>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled item</p>
    <ColorSwatchPicker defaultValue="#ef4444" aria-label="With a locked swatch">
      <ColorSwatchPickerItem color="#ef4444" />
      <ColorSwatchPickerItem color="#f59e0b" disabled />
      <ColorSwatchPickerItem color="#22c55e" />
    </ColorSwatchPicker>
  </div>
</section>
