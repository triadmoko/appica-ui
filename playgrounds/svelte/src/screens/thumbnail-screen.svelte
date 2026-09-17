<script lang="ts">
  import { onMount } from 'svelte'
  import { Button, DirectionProvider, Skeleton, Switch, Thumbnail } from '@appica/ui-svelte'

  const SIZES = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
  const CUSTOM_SIZES = [40, 56, 88] as const
  const IMAGE_SRC = 'https://picsum.photos/id/1015/160/160'
  const IMAGE_ALT = 'Snow-capped mountain peak at sunset'
  const SQUIRCLE = 'rounded-[calc(tan(atan2(var(--radius-md),2.5rem))*100%)]'
  const ICON_VARIANTS = [
    { variant: 'icon-soft', d: 'M2 6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z' },
    {
      variant: 'icon-outline',
      d: 'M5 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5zm1 13 3.2-4.2 2.4 2.8L14.5 12 19 17H6zM8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    },
    { variant: 'icon-primary', d: 'M13 2 4 14h7l-1 8 9-12h-7l1-8z' },
    {
      variant: 'icon-primary-outline',
      d: 'M12 21s-6.8-4.35-9.33-8.05C.4 9.5 1.55 5.5 5 4.15 7.2 3.3 9.45 4 12 6.35 14.55 4 16.8 3.3 19 4.15c3.45 1.35 4.6 5.35 2.33 8.8C18.8 16.65 12 21 12 21z',
    },
    {
      variant: 'icon-secondary',
      d: 'M12 2.4 14.7 8.5l6.6.6-5 4.2 1.5 6.5L12 16.8l-5.8 3 1.5-6.5-5-4.2 6.6-.6L12 2.4z',
    },
    {
      variant: 'icon-error',
      d: 'M9 3h6l1 2h4v2H4V5h4l1-2zm-2 6h10l-.7 11.1A2 2 0 0 1 14.3 22H9.7a2 2 0 0 1-2-1.9L7 9z',
    },
    { variant: 'icon-success', d: 'M9.5 16.6 5 12.1l1.4-1.4 3.1 3.1 8.1-8.1L19 7.1z' },
    {
      variant: 'icon-warning',
      d: 'M12 3a6 6 0 0 1 6 6v4.2l1.6 2.8H4.4L6 13.2V9a6 6 0 0 1 6-6zm0 18a2.4 2.4 0 0 1-2.4-2.4h4.8A2.4 2.4 0 0 1 12 21z',
    },
    {
      variant: 'icon-info',
      d: 'M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z',
      d2: 'M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z',
    },
  ] as const

  let src = $state<string | undefined>()
  let loaded = $state(false)
  let nonce = $state(0)
  let dir: 'ltr' | 'rtl' = $state('ltr')
  let loadTimer: ReturnType<typeof setTimeout> | undefined

  function startLoad() {
    src = undefined
    loaded = false
    if (loadTimer) clearTimeout(loadTimer)
    loadTimer = setTimeout(() => {
      src = `${IMAGE_SRC}?reload=${nonce}`
    }, 2500)
  }

  function reload() {
    nonce += 1
    startLoad()
  }

  onMount(() => {
    startLoad()
    return () => {
      if (loadTimer) clearTimeout(loadTimer)
    }
  })
</script>

{#snippet icon(d: string, d2?: string)}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path {d}></path>
    {#if d2}
      <path d={d2}></path>
    {/if}
  </svg>
{/snippet}

{#snippet mediaList()}
  <ul class="divide-border border-border w-full max-w-90 divide-y rounded-xl border">
    <li class="flex items-center gap-3 px-4 py-3">
      <Thumbnail size="md" src={IMAGE_SRC} alt="Mountain peak" />
      <div class="flex flex-col">
        <span class="text-foreground-intense text-sm font-medium">Summit.jpg</span>
        <span class="text-foreground-muted text-xs">Image · 2.4 MB</span>
      </div>
    </li>
    <li class="flex items-center gap-3 px-4 py-3">
      <Thumbnail size="md" variant="icon-soft">
        {@render icon(ICON_VARIANTS[0].d)}
      </Thumbnail>
      <div class="flex flex-col">
        <span class="text-foreground-intense text-sm font-medium">Field notes</span>
        <span class="text-foreground-muted text-xs">Folder · 18 items</span>
      </div>
    </li>
    <li class="flex items-center gap-3 px-4 py-3">
      <Thumbnail size="md" variant="icon-primary">
        {@render icon('M9 3v12.3A3.5 3.5 0 1 0 11 18V8l8-1.5V14a3.5 3.5 0 1 0 2 3.3V3L9 5z')}
      </Thumbnail>
      <div class="flex flex-col">
        <span class="text-foreground-intense text-sm font-medium">Trailhead.mp3</span>
        <span class="text-foreground-muted text-xs">Audio · 3:42</span>
      </div>
    </li>
    <li class="flex items-center gap-3 px-4 py-3">
      <Thumbnail size="md" variant="icon-secondary">
        {@render icon('M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z')}
      </Thumbnail>
      <div class="flex flex-col">
        <span class="text-foreground-intense text-sm font-medium">Moodboard</span>
        <span class="text-foreground-muted text-xs">Album · 24 photos</span>
      </div>
    </li>
  </ul>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Thumbnail</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Default</p>
    <Thumbnail size="xl" src={IMAGE_SRC} alt={IMAGE_ALT} />
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-end justify-center gap-4">
      {#each SIZES as size (size)}
        <Thumbnail {size} src={IMAGE_SRC} alt="Mountain peak" />
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Custom size</p>
    <div class="flex items-end gap-4">
      {#each CUSTOM_SIZES as size (size)}
        <Thumbnail {size} src={IMAGE_SRC} alt="Mountain peak" />
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Shape</p>
    <div class="flex items-center gap-4">
      <Thumbnail size="xl" shape="rounded" src={IMAGE_SRC} alt="Mountain peak" />
      <Thumbnail size="xl" shape="circle" src={IMAGE_SRC} alt="Mountain peak" />
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Icon variants</p>
    <div class="flex flex-wrap items-center justify-center gap-4">
      {#each ICON_VARIANTS as item (item.variant)}
        <Thumbnail variant={item.variant} size="lg">
          {@render icon(item.d, 'd2' in item ? item.d2 : undefined)}
        </Thumbnail>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Fallback</p>
    <Thumbnail size="xl" src="https://example.com/thumbnail-does-not-exist.jpg" alt="Unavailable image" />
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Media list</p>
    {@render mediaList()}
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Loading</p>
    <div class="flex flex-col items-center gap-4">
      <div class="relative inline-flex">
        <Thumbnail
          size="2xl"
          alt="Mountain peak"
          {src}
          onLoadingStatusChange={(status) => (loaded = status === 'loaded')}
        />
        {#if !loaded}
          <Skeleton class={['absolute inset-0', SQUIRCLE]} />
        {/if}
      </div>
      <Button variant="outline" size="sm" onclick={reload} disabled={!src}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.85"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          data-icon="start"
        >
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
          <path d="M21 3v5h-5"></path>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
          <path d="M8 16H3v5"></path>
        </svg>
        Reload
      </Button>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        {@render mediaList()}
      </div>
    </DirectionProvider>
  </div>
</section>
