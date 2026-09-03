<script lang="ts">
  import {
    DirectionProvider,
    Kbd,
    Switch,
    Toolbar,
    ToolbarSeparator,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    buttonVariants,
  } from '@appica/ui-svelte'

  const SIDES = ['top', 'right', 'bottom', 'left'] as const
  const ALIGNS = ['start', 'center', 'end'] as const
  const ACTIONS = [
    { label: 'Bold', kind: 'bold' },
    { label: 'Italic', kind: 'italic' },
    { label: 'Underline', kind: 'underline' },
    { label: 'Strikethrough', kind: 'strikethrough' },
    { label: 'Link', kind: 'link' },
  ] as const

  let controlledOpen = $state(false)
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

{#snippet heartIcon()}
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
{/snippet}

{#snippet bookmarkIcon()}
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
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
{/snippet}

{#snippet formatIcon(kind: (typeof ACTIONS)[number]['kind'])}
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
    {#if kind === 'bold'}
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
    {:else if kind === 'italic'}
      <line x1="19" x2="10" y1="4" y2="4"></line>
      <line x1="14" x2="5" y1="20" y2="20"></line>
      <line x1="15" x2="9" y1="4" y2="20"></line>
    {:else if kind === 'underline'}
      <path d="M6 4v6a6 6 0 0 0 12 0V4"></path>
      <line x1="4" x2="20" y1="20" y2="20"></line>
    {:else if kind === 'strikethrough'}
      <path d="M16 4H9a3 3 0 0 0-2.83 4"></path>
      <path d="M14 12a4 4 0 0 1 0 8H6"></path>
      <line x1="4" x2="20" y1="12" y2="12"></line>
    {:else if kind === 'link'}
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    {/if}
  </svg>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Tooltip</h2>

  <TooltipProvider>
    <div class="flex flex-col gap-3">
      <p class="text-foreground-muted text-sm">Usage</p>
      <div class="flex flex-wrap items-center gap-3">
        <Tooltip>
          <TooltipTrigger
            class={buttonVariants({ variant: 'outline', size: 'icon-md' })}
            aria-label="Add to favorites"
          >
            {@render heartIcon()}
          </TooltipTrigger>
          <TooltipContent>Add to favorites</TooltipContent>
        </Tooltip>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <p class="text-foreground-muted text-sm">Side & alignment</p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        {#each SIDES as side (side)}
          <Tooltip>
            <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>{side}</TooltipTrigger>
            <TooltipContent {side}>Opens on the {side}</TooltipContent>
          </Tooltip>
        {/each}
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3">
        {#each ALIGNS as align (align)}
          <Tooltip>
            <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>{align}</TooltipTrigger>
            <TooltipContent side="bottom" {align}>Align {align}</TooltipContent>
          </Tooltip>
        {/each}
      </div>
    </div>
  </TooltipProvider>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Shared provider</p>
    <TooltipProvider delay={400}>
      <Toolbar aria-label="Text formatting">
        {#each ACTIONS as action, index (action.label)}
          {#if index === ACTIONS.length - 1}
            <ToolbarSeparator />
          {/if}
          <Tooltip>
            <TooltipTrigger
              class={buttonVariants({ variant: 'ghost', size: 'icon-md' })}
              aria-label={action.label}
            >
              {@render formatIcon(action.kind)}
            </TooltipTrigger>
            <TooltipContent>{action.label}</TooltipContent>
          </Tooltip>
        {/each}
      </Toolbar>
    </TooltipProvider>
  </div>

  <TooltipProvider>
    <div class="flex flex-col gap-3">
      <p class="text-foreground-muted text-sm">Rich content</p>
      <div class="flex flex-wrap items-center gap-3">
        <Tooltip>
          <TooltipTrigger class={buttonVariants({ variant: 'outline', size: 'icon-md' })} aria-label="Save">
            {@render bookmarkIcon()}
          </TooltipTrigger>
          <TooltipContent class="flex items-center gap-2">
            Save
            <Kbd size="sm">⌘ S</Kbd>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <p class="text-foreground-muted text-sm">Follow the cursor</p>
      <Tooltip trackCursorAxis="x">
        <TooltipTrigger
          type="button"
          class="bg-background-subtle border-border-strong flex h-32 w-72 cursor-default items-center justify-center rounded-xl border border-dashed text-sm select-none"
        >
          Hover and move across
        </TooltipTrigger>
        <TooltipContent>Following the cursor</TooltipContent>
      </Tooltip>
    </div>

    <div class="flex flex-col gap-3">
      <p class="text-foreground-muted text-sm">Without an arrow</p>
      <div class="flex flex-wrap items-center gap-3">
        <Tooltip>
          <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>No arrow</TooltipTrigger>
          <TooltipContent arrow={false}>Sits flush, without a pointer</TooltipContent>
        </Tooltip>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <p class="text-foreground-muted text-sm">Disabled</p>
      <div class="flex flex-wrap items-center gap-3">
        <Tooltip disabled>
          <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>Disabled tooltip</TooltipTrigger>
          <TooltipContent>Will not open</TooltipContent>
        </Tooltip>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <p class="text-foreground-muted text-sm">Controlled</p>
      <label class="flex items-center gap-2 text-sm">
        <Switch checked={controlledOpen} onCheckedChange={(next) => (controlledOpen = next)} />
        Open
      </label>
      <div class="flex flex-wrap items-center gap-3">
        <Tooltip bind:open={controlledOpen}>
          <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>Hover or toggle</TooltipTrigger>
          <TooltipContent>Controlled from the switch</TooltipContent>
        </Tooltip>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <p class="text-foreground-muted text-sm">RTL</p>
      <label class="flex items-center gap-2 text-sm">
        <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
        RTL
      </label>
      <DirectionProvider {dir}>
        <div {dir} class="flex flex-wrap items-center gap-3">
          <Tooltip>
            <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>start</TooltipTrigger>
            <TooltipContent side="bottom" align="start">Align start</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>end</TooltipTrigger>
            <TooltipContent side="bottom" align="end">Align end</TooltipContent>
          </Tooltip>
        </div>
      </DirectionProvider>
    </div>
  </TooltipProvider>
</section>
