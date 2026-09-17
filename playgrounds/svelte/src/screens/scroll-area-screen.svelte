<script lang="ts">
  import { DirectionProvider, ScrollArea, Switch } from '@appica/ui-svelte'

  const tags = [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Base UI',
    'Motion',
    'Vitest',
    'Fumadocs',
    'pnpm',
    'Radix',
    'Zod',
    'ESLint',
    'Prettier',
    'Storybook',
    'Playwright',
    'tRPC',
  ]

  const paragraphs = [
    'Scroll shadows hint that there is more content beyond the visible edge. Instead of a hard cut, the text fades out where it meets the boundary of the viewport.',
    'The fade is a CSS mask applied to the viewport, so it costs nothing at runtime and follows the content as you scroll - the top edge clears once you reach the start, and the bottom clears at the end.',
    'Because it is purely visual, the mask never blocks pointer events or selection. The text underneath stays fully interactive; only its opacity near the edges is affected.',
    'Reach for it on free-flowing prose, feeds, and long lists where a visible scrollbar alone is easy to miss. Pair it with any orientation - the mask fades whichever edges can scroll.',
    'When the content fits without overflowing, the mask resolves to fully opaque, so short content is never dimmed by accident.',
  ]

  let dir: 'ltr' | 'rtl' = $state('ltr')
  let playgroundOrientation: 'vertical' | 'horizontal' | 'both' = $state('vertical')
  let playgroundVisibility: 'always' | 'auto' | 'never' = $state('always')
  let playgroundShadow = $state(false)

  const playgroundClass = $derived(
    playgroundOrientation === 'horizontal'
      ? 'w-full max-w-md rounded-lg border'
      : playgroundOrientation === 'both'
        ? 'h-58 w-full max-w-md rounded-lg border'
        : 'border-border h-58 w-full max-w-64 rounded-lg border',
  )
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">ScrollArea</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Playground</p>
    <div class="flex flex-wrap items-center gap-3 text-sm">
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">Orientation</span>
        <select
          bind:value={playgroundOrientation}
          class="border-border bg-background rounded-md border px-2 py-1"
        >
          <option value="vertical">vertical</option>
          <option value="horizontal">horizontal</option>
          <option value="both">both</option>
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">Visibility</span>
        <select
          bind:value={playgroundVisibility}
          class="border-border bg-background rounded-md border px-2 py-1"
        >
          <option value="always">always</option>
          <option value="auto">auto</option>
          <option value="never">never</option>
        </select>
      </label>
      <label class="flex items-center gap-2">
        <Switch checked={playgroundShadow} onCheckedChange={(next) => (playgroundShadow = next)} />
        <span class="text-foreground-muted">scrollShadow</span>
      </label>
    </div>
    <ScrollArea
      orientation={playgroundOrientation}
      scrollbarVisibility={playgroundVisibility}
      scrollShadow={playgroundShadow}
      class={playgroundClass}
    >
      {#if playgroundOrientation === 'horizontal'}
        <div class="flex gap-3 p-4">
          {#each Array.from({ length: 12 }, (_, i) => i + 1) as n (n)}
            <div
              class="bg-background-muted flex size-24 shrink-0 items-center justify-center rounded-lg text-lg font-medium"
            >
              {n}
            </div>
          {/each}
        </div>
      {:else if playgroundOrientation === 'both'}
        <div class="grid w-max grid-cols-8 gap-2 p-4">
          {#each Array.from({ length: 96 }, (_, i) => i + 1) as n (n)}
            <div
              class="bg-background-muted text-foreground-muted flex size-14 shrink-0 items-center justify-center rounded-md text-xs"
            >
              {n}
            </div>
          {/each}
        </div>
      {:else}
        <div class="flex flex-col p-2">
          {#each tags as tag (tag)}
            <div class="text-foreground rounded-md px-3 py-2 text-sm">{tag}</div>
          {/each}
        </div>
      {/if}
    </ScrollArea>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Vertical scrolling</p>
    <ScrollArea class="border-border h-58 w-full max-w-64 rounded-lg border">
      <div class="flex flex-col p-2">
        {#each tags as tag (tag)}
          <div class="text-foreground rounded-md px-3 py-2 text-sm">{tag}</div>
        {/each}
      </div>
    </ScrollArea>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Horizontal scrolling</p>
    <ScrollArea orientation="horizontal" class="w-full max-w-md rounded-lg border">
      <div class="flex gap-3 p-4">
        {#each Array.from({ length: 12 }, (_, i) => i + 1) as n (n)}
          <div
            class="bg-background-muted flex size-24 shrink-0 items-center justify-center rounded-lg text-lg font-medium"
          >
            {n}
          </div>
        {/each}
      </div>
    </ScrollArea>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Both axes</p>
    <ScrollArea orientation="both" class="h-58 w-full max-w-md rounded-lg border">
      <div class="grid w-max grid-cols-8 gap-2 p-4">
        {#each Array.from({ length: 96 }, (_, i) => i + 1) as n (n)}
          <div
            class="bg-background-muted text-foreground-muted flex size-14 shrink-0 items-center justify-center rounded-md text-xs"
          >
            {n}
          </div>
        {/each}
      </div>
    </ScrollArea>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Scroll shadow</p>
    <ScrollArea scrollShadow class="h-56 w-full max-w-sm">
      <div class="text-foreground flex flex-col gap-3 px-1 py-2 pr-4 text-sm leading-relaxed">
        {#each paragraphs as text, i (i)}
          <p>{text}</p>
        {/each}
      </div>
    </ScrollArea>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Scrollbar visibility</p>
    <ScrollArea scrollbarVisibility="auto" class="border-border h-58 w-full max-w-64 rounded-lg border">
      <div class="flex flex-col p-2">
        {#each Array.from({ length: 20 }, (_, i) => i + 1) as n (n)}
          <div class="text-foreground rounded-md px-3 py-2 text-sm">Notification {n}</div>
        {/each}
      </div>
    </ScrollArea>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="flex w-full max-w-md flex-col gap-5">
        <ScrollArea class="border-border h-58 w-full max-w-64 rounded-lg border">
          <div class="flex flex-col p-2">
            {#each tags as tag (tag)}
              <div class="text-foreground rounded-md px-3 py-2 text-sm">{tag}</div>
            {/each}
          </div>
        </ScrollArea>
        <ScrollArea orientation="horizontal" class="w-full max-w-md rounded-lg border">
          <div class="flex gap-3 p-4">
            {#each Array.from({ length: 12 }, (_, i) => i + 1) as n (n)}
              <div
                class="bg-background-muted flex size-24 shrink-0 items-center justify-center rounded-lg text-lg font-medium"
              >
                {n}
              </div>
            {/each}
          </div>
        </ScrollArea>
        <ScrollArea scrollShadow class="h-56 w-full max-w-sm">
          <div class="text-foreground flex flex-col gap-3 px-1 py-2 pr-4 text-sm leading-relaxed">
            {#each paragraphs as text, i (i)}
              <p>{text}</p>
            {/each}
          </div>
        </ScrollArea>
      </div>
    </DirectionProvider>
  </div>
</section>
