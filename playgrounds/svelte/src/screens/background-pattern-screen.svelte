<script lang="ts">
  import { BackgroundPattern, type BackgroundPatternVariant } from '@appica/ui-svelte'

  const VARIANTS = ['dots', 'grid', 'dashed-grid', 'hexagons'] as const satisfies readonly BackgroundPatternVariant[]
  const SPOTLIGHT_MODES = ['off', 'true', 'persistent'] as const
  const CELL_SIZES = ['default', '16', '28', '40'] as const
  const TRACKS = ['self', 'window'] as const

  let playgroundVariant: (typeof VARIANTS)[number] = $state('dots')
  let playgroundSpotlight: (typeof SPOTLIGHT_MODES)[number] = $state('off')
  let playgroundCellSize: (typeof CELL_SIZES)[number] = $state('default')
  let playgroundTrack: (typeof TRACKS)[number] = $state('self')

  const playgroundSpotlightValue = $derived(
    playgroundSpotlight === 'off' ? false : playgroundSpotlight === 'true' ? true : { persistent: true },
  )
  const playgroundCellSizeValue = $derived(
    playgroundCellSize === 'default' ? undefined : Number(playgroundCellSize),
  )
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">BackgroundPattern</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Playground</p>
    <div class="flex flex-wrap items-center gap-3 text-sm">
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">Variant</span>
        <select bind:value={playgroundVariant} class="border-border bg-background rounded-md border px-2 py-1">
          {#each VARIANTS as variant (variant)}
            <option value={variant}>{variant}</option>
          {/each}
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">Spotlight</span>
        <select bind:value={playgroundSpotlight} class="border-border bg-background rounded-md border px-2 py-1">
          {#each SPOTLIGHT_MODES as mode (mode)}
            <option value={mode}>{mode}</option>
          {/each}
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">cellSize</span>
        <select bind:value={playgroundCellSize} class="border-border bg-background rounded-md border px-2 py-1">
          {#each CELL_SIZES as size (size)}
            <option value={size}>{size}</option>
          {/each}
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">track</span>
        <select bind:value={playgroundTrack} class="border-border bg-background rounded-md border px-2 py-1">
          {#each TRACKS as track (track)}
            <option value={track}>{track}</option>
          {/each}
        </select>
      </label>
    </div>
    <BackgroundPattern
      variant={playgroundVariant}
      spotlight={playgroundSpotlightValue}
      cellSize={playgroundCellSizeValue}
      track={playgroundTrack}
      class="bg-background-subtle flex min-h-56 w-full max-w-xl items-center justify-center overflow-hidden rounded-xl"
    >
      <span class="text-foreground-intense text-sm font-medium">Live controls</span>
    </BackgroundPattern>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Usage</p>
    <BackgroundPattern class="bg-background-subtle flex min-h-40 w-full max-w-xl items-center justify-center overflow-hidden rounded-xl">
      <span class="text-foreground-intense text-sm font-medium">Your content</span>
    </BackgroundPattern>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
      {#each VARIANTS as variant (variant)}
        <BackgroundPattern
          {variant}
          class="bg-background-subtle flex min-h-40 items-center justify-center overflow-hidden rounded-xl"
        >
          <span class="text-foreground-intense text-sm font-medium capitalize">{variant.replace('-', ' ')}</span>
        </BackgroundPattern>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Spotlight</p>
    <BackgroundPattern
      variant="dots"
      spotlight
      class="bg-background-subtle flex min-h-56 w-full max-w-xl items-center justify-center overflow-hidden rounded-xl"
    >
      <span class="text-foreground-intense text-sm font-medium">Move your cursor over the panel</span>
    </BackgroundPattern>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Persistent / sized spotlight</p>
    <BackgroundPattern
      variant="dashed-grid"
      spotlight={{ persistent: true, size: 150 }}
      class="bg-background-subtle flex min-h-56 w-full max-w-xl items-center justify-center overflow-hidden rounded-xl"
    >
      <span class="text-foreground-intense text-sm font-medium">Always-on highlight</span>
    </BackgroundPattern>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Custom cell size</p>
    <div class="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
      <BackgroundPattern
        variant="grid"
        cellSize={16}
        class="bg-background-subtle flex min-h-48 items-center justify-center overflow-hidden rounded-xl"
      >
        <span class="text-foreground-intense text-sm font-medium">cellSize 16</span>
      </BackgroundPattern>
      <BackgroundPattern
        variant="grid"
        cellSize={40}
        class="bg-background-subtle flex min-h-48 items-center justify-center overflow-hidden rounded-xl"
      >
        <span class="text-foreground-intense text-sm font-medium">cellSize 40</span>
      </BackgroundPattern>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Custom color</p>
    <BackgroundPattern
      variant="hexagons"
      spotlight
      class="flex min-h-56 w-full max-w-xl items-center justify-center overflow-hidden rounded-xl bg-[color-mix(in_oklab,#7c6cf6_8%,var(--background))] [--pattern-color:#7c6cf6]"
    >
      <span class="text-foreground-intense text-sm font-medium">Tinted with a custom color</span>
    </BackgroundPattern>
  </div>
</section>
