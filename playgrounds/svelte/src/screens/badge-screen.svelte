<script lang="ts">
  import { Badge, Button, DirectionProvider, Switch } from '@appica/ui-svelte'

  const variants = [
    { variant: 'primary', label: 'Primary' },
    { variant: 'primary-outline', label: 'Primary outline' },
    { variant: 'secondary', label: 'Secondary' },
    { variant: 'soft', label: 'Soft' },
    { variant: 'outline', label: 'Outline' },
    { variant: 'error', label: 'Error' },
    { variant: 'success', label: 'Success' },
    { variant: 'warning', label: 'Warning' },
    { variant: 'info', label: 'Info' },
  ] as const

  const sizes = [
    { size: 'xs', label: 'Extra small' },
    { size: 'sm', label: 'Small' },
    { size: 'md', label: 'Medium' },
    { size: 'lg', label: 'Large' },
  ] as const

  let following = $state(false)
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

{#snippet checkIcon(position?: 'start' | 'end')}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    data-icon={position}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
{/snippet}

{#snippet flameIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    data-icon="start"
  >
    <path
      d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
    />
  </svg>
{/snippet}

{#snippet bellRingIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    data-icon="end"
  >
    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
    <path d="M22 8c0-2.3-.8-4.3-2-6" />
    <path
      d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
    />
    <path d="M4 2C2.8 3.7 2 5.7 2 8" />
  </svg>
{/snippet}

{#snippet crownIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    data-icon="start"
  >
    <path
      d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"
    />
    <path d="M5 21h14" />
  </svg>
{/snippet}

{#snippet starIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path
      d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
    />
  </svg>
{/snippet}

{#snippet boltIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path
      d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
    />
  </svg>
{/snippet}

{#snippet bellIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
{/snippet}

{#snippet withIcon()}
  <div class="flex flex-wrap items-center justify-center gap-2">
    <Badge variant="success">
      {@render checkIcon('start')}
      Verified
    </Badge>
    <Badge variant="warning">
      {@render flameIcon()}
      Hot
    </Badge>
    <Badge variant="soft">
      Notification
      {@render bellRingIcon()}
    </Badge>
  </div>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Badge</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Usage</p>
    <Badge>Badge</Badge>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each variants as item (item.variant)}
        <Badge variant={item.variant}>{item.label}</Badge>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">On dark backgrounds</p>
    <div class="relative flex h-44 w-full max-w-66 items-end justify-start overflow-hidden rounded-xl">
      <img
        src="https://picsum.photos/id/1015/576/328"
        alt=""
        class="absolute inset-0 size-full object-cover"
      />
      <div class="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"></div>
      <Badge variant="light" class="relative m-3">
        {@render crownIcon()}
        Premium
      </Badge>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each sizes as item (item.size)}
        <Badge size={item.size}>{item.label}</Badge>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">With an icon</p>
    {@render withIcon()}
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Icon only</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="success" size="icon-sm" role="img" aria-label="Verified">
        {@render checkIcon()}
      </Badge>
      <Badge variant="primary-outline" size="icon-md" role="img" aria-label="Featured">
        {@render starIcon()}
      </Badge>
      <Badge variant="warning" size="icon-lg" role="img" aria-label="Boosted">
        {@render boltIcon()}
      </Badge>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Notification count</p>
    <div class="relative mt-2 inline-flex w-fit">
      <Button variant="outline" size="icon-md" aria-label="Notifications">
        {@render bellIcon()}
      </Button>
      <Badge
        variant="secondary"
        size="xs"
        class="absolute -inset-e-1.5 -top-1.5 min-w-4 px-1 font-medium"
        aria-label="3 unread notifications"
      >
        3
      </Badge>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Interactive (link or button)</p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="soft" href="#design">Design</Badge>
      <Badge variant="outline" href="#trending">Trending</Badge>
      <Badge variant={following ? 'primary' : 'primary-outline'} onclick={() => (following = !following)}>
        {following ? 'Following' : 'Follow'}
      </Badge>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="flex flex-col items-start gap-4">
        {@render withIcon()}
        <div class="relative mt-2 inline-flex w-fit">
          <Button variant="outline" size="icon-md" aria-label="Notifications">
            {@render bellIcon()}
          </Button>
          <Badge
            variant="secondary"
            size="xs"
            class="absolute -inset-e-1.5 -top-1.5 min-w-4 px-1 font-medium"
            aria-label="3 unread notifications"
          >
            3
          </Badge>
        </div>
      </div>
    </DirectionProvider>
  </div>
</section>
