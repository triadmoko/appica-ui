<script lang="ts">
  import { onMount } from 'svelte'
  import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarImage,
    Button,
    DirectionProvider,
    Skeleton,
    Switch,
  } from '@appica/ui-svelte'

  const SIZES = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

  const people = [
    { src: 'https://i.pravatar.cc/150?img=1', alt: 'Sarah Jenkins', initials: 'SJ' },
    { src: 'https://i.pravatar.cc/150?img=12', alt: 'Liam Hudson', initials: 'LH' },
    { src: 'https://i.pravatar.cc/150?img=13', alt: 'Mateo Rossi', initials: 'MR' },
    { src: 'https://i.pravatar.cc/150?img=5', alt: 'Ava Thompson', initials: 'AT' },
  ] as const

  let src = $state<string | undefined>()
  let nonce = $state(0)
  let dir: 'ltr' | 'rtl' = $state('ltr')
  let loadTimer: ReturnType<typeof setTimeout> | undefined

  function startLoad() {
    src = undefined
    if (loadTimer) clearTimeout(loadTimer)
    loadTimer = setTimeout(() => {
      src = `https://i.pravatar.cc/150?img=9&reload=${nonce}`
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

{#snippet userIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
    ></path>
  </svg>
{/snippet}

{#snippet groupRow()}
  <AvatarGroup size="md">
    {#each people as person (person.src)}
      <Avatar>
        <AvatarImage src={person.src} alt={person.alt} />
        <AvatarFallback>{person.initials}</AvatarFallback>
      </Avatar>
    {/each}
    <Avatar>
      <AvatarFallback class="text-foreground-muted text-sm">+5</AvatarFallback>
    </Avatar>
  </AvatarGroup>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Avatar</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Default</p>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Sarah Jenkins" />
      <AvatarFallback>SJ</AvatarFallback>
    </Avatar>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Fallback</p>
    <div class="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage src="https://example.com/does-not-exist.jpg" alt="Sarah Jenkins" />
        <AvatarFallback>SJ</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>
          {@render userIcon()}
        </AvatarFallback>
      </Avatar>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-center justify-center gap-4">
      {#each SIZES as size (size)}
        <Avatar {size}>
          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Daniel Reyes" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Custom size</p>
    <div class="flex items-center gap-4">
      <Avatar size={28}>
        <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Ava Thompson" />
        <AvatarFallback>AT</AvatarFallback>
      </Avatar>
      <Avatar size={44}>
        <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Ava Thompson" />
        <AvatarFallback>AT</AvatarFallback>
      </Avatar>
      <Avatar size={72}>
        <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Ava Thompson" />
        <AvatarFallback>AT</AvatarFallback>
      </Avatar>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Shape</p>
    <div class="flex items-center gap-4">
      <Avatar size="lg" shape="circle">
        <AvatarImage src="https://i.pravatar.cc/150?img=13" alt="Mateo Rossi" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar size="lg" shape="rounded">
        <AvatarImage src="https://i.pravatar.cc/150?img=13" alt="Mateo Rossi" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Status badge</p>
    <div class="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/150?img=8" alt="Liam Hudson" />
        <AvatarFallback>LH</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/150?img=9" alt="Emma Garcia" />
        <AvatarFallback>EG</AvatarFallback>
        <AvatarBadge animate />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Lucas Müller" />
        <AvatarFallback>LM</AvatarFallback>
        <AvatarBadge class="text-foreground-subtle" />
      </Avatar>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Avatar group</p>
    {@render groupRow()}
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Vertical group</p>
    <AvatarGroup size="md" orientation="vertical">
      {#each people.slice(0, 3) as person (person.src)}
        <Avatar>
          <AvatarImage src={person.src} alt={person.alt} />
          <AvatarFallback>{person.initials}</AvatarFallback>
        </Avatar>
      {/each}
    </AvatarGroup>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Loading animation</p>
    <div class="flex flex-col items-center gap-4">
      <Avatar size="xl" class="bg-transparent">
        <AvatarImage {src} alt="Emma Garcia" />
        <AvatarFallback>
          <Skeleton class="size-full rounded-[inherit]" />
        </AvatarFallback>
      </Avatar>
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
      <div {dir} class="flex flex-col items-start gap-5">
        <Avatar size="lg">
          <AvatarImage src="https://i.pravatar.cc/150?img=8" alt="Liam Hudson" />
          <AvatarFallback>LH</AvatarFallback>
          <AvatarBadge animate />
        </Avatar>
        {@render groupRow()}
      </div>
    </DirectionProvider>
  </div>
</section>
