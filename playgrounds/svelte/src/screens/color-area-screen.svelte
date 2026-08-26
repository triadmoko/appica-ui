<script lang="ts">
  import { ColorArea, formatColor, parseColor } from '@appica/ui-svelte'

  let color = $state(parseColor('hsb(210, 70%, 90%)'))
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">ColorArea</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">HSB saturation / brightness ({formatColor(color, 'hex')})</p>
    <ColorArea
      bind:value={color}
      colorSpace="hsb"
      xChannel="saturation"
      yChannel="brightness"
      aria-label="Saturation and brightness"
    />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RGB red / green</p>
    <ColorArea defaultValue="#3b82f6" colorSpace="rgb" xChannel="red" yChannel="green" aria-label="Red and green" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <ColorArea
      disabled
      defaultValue="hsb(210, 70%, 90%)"
      colorSpace="hsb"
      xChannel="saturation"
      yChannel="brightness"
    />
  </div>
</section>
