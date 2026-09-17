<script lang="ts">
  import { DirectionProvider, Slider, Switch } from '@appica/ui-svelte'

  const CHANNELS = [
    { key: 'r', label: 'R' },
    { key: 'g', label: 'G' },
    { key: 'b', label: 'B' },
  ] as const

  let rgb = $state({ r: 99, g: 102, b: 241 })
  let dir: 'ltr' | 'rtl' = $state('ltr')

  const color = $derived(`#${[rgb.r, rgb.g, rgb.b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`)
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Slider</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Usage</p>
    <Slider class="max-w-70" defaultValue={50} thumbAriaLabel="Volume" />
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Range</p>
    <Slider
      class="max-w-70"
      defaultValue={[25, 75]}
      thumbAriaLabel={(index) => (index === 0 ? 'Minimum' : 'Maximum')}
    />
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Steps</p>
    <Slider
      class="max-w-70"
      defaultValue={40}
      min={0}
      max={100}
      step={10}
      tooltipVisibility="always"
      thumbAriaLabel="Amount"
    />
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Tooltip visibility</p>
    <div class="flex w-full max-w-70 flex-col gap-8">
      <Slider defaultValue={30} tooltipVisibility="auto" thumbAriaLabel="Auto" />
      <Slider defaultValue={50} tooltipVisibility="always" thumbAriaLabel="Always" />
      <Slider defaultValue={70} tooltipVisibility="never" thumbAriaLabel="Never" />
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Vertical</p>
    <div class="flex h-48 items-center gap-10">
      <Slider orientation="vertical" defaultValue={60} thumbAriaLabel="Volume" />
      <Slider
        orientation="vertical"
        defaultValue={[20, 80]}
        thumbAriaLabel={(index) => (index === 0 ? 'Min' : 'Max')}
      />
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Controlled</p>
    <div class="flex w-full max-w-90 items-center gap-6">
      <div class="flex w-full max-w-64 flex-col gap-4">
        {#each CHANNELS as channel (channel.key)}
          <div class="flex items-center gap-3">
            <span class="text-foreground-muted w-3 text-sm font-medium">{channel.label}</span>
            <Slider
              class="flex-1"
              value={rgb[channel.key]}
              onValueChange={(value) => {
                rgb[channel.key] = typeof value === 'number' ? value : (value[0] ?? 0)
              }}
              min={0}
              max={255}
              tooltipVisibility="never"
              thumbAriaLabel={`${channel.label} channel`}
            />
            <span class="text-foreground-muted w-8 text-end text-sm tabular-nums">{rgb[channel.key]}</span>
          </div>
        {/each}
      </div>
      <div class="flex shrink-0 flex-col items-center gap-2">
        <div class="border-border-muted size-20 rounded-lg border" style:background-color={color} aria-hidden="true"></div>
        <span class="text-foreground-muted font-mono text-xs uppercase">{color}</span>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <Slider class="max-w-70" defaultValue={50} disabled thumbAriaLabel="Disabled" />
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="max-w-70">
        <Slider defaultValue={50} thumbAriaLabel="Volume" />
      </div>
    </DirectionProvider>
  </div>
</section>
