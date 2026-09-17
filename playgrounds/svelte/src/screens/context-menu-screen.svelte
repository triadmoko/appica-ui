<script lang="ts">
  import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuGroupLabel,
    ContextMenuItem,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
    DirectionProvider,
    Kbd,
    Switch,
  } from '@appica/ui-svelte'

  let showGrid = $state(true)
  let showRulers = $state(false)
  let zoom = $state('fit')
  let dir: 'ltr' | 'rtl' = $state('ltr')
  const SIZES = ['sm', 'md', 'lg'] as const
</script>

{#snippet copyIcon()}
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
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
  </svg>
{/snippet}

{#snippet scissorsIcon()}
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
    <circle cx="6" cy="6" r="3"></circle>
    <path d="M8.12 8.12 12 12"></path>
    <path d="M20 4 8.12 15.88"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <path d="M14.8 14.8 20 20"></path>
  </svg>
{/snippet}

{#snippet clipboardIcon()}
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
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
  </svg>
{/snippet}

{#snippet trashIcon()}
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
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
{/snippet}

{#snippet photoIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="size-8"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
    <circle cx="9" cy="9" r="2"></circle>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
  </svg>
{/snippet}

{#snippet downloadIcon()}
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" x2="12" y1="15" y2="3"></line>
  </svg>
{/snippet}

{#snippet pencilIcon()}
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
      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    ></path>
    <path d="m15 5 4 4"></path>
  </svg>
{/snippet}

{#snippet linkIcon()}
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
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
{/snippet}

{#snippet folderIcon()}
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
      d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    ></path>
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
    data-icon="start"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    ></polygon>
  </svg>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Context menu</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Basic</p>
    <ContextMenu>
      <ContextMenuTrigger
        class="bg-background-subtle border-border-strong flex h-40 w-72 items-center justify-center rounded-xl border border-dashed text-sm select-none"
      >
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          {@render copyIcon()}
          Copy
          <Kbd size="sm" class="ms-auto">⌘C</Kbd>
        </ContextMenuItem>
        <ContextMenuItem>
          {@render scissorsIcon()}
          Cut
          <Kbd size="sm" class="ms-auto">⌘X</Kbd>
        </ContextMenuItem>
        <ContextMenuItem>
          {@render clipboardIcon()}
          Paste
          <Kbd size="sm" class="ms-auto">⌘V</Kbd>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem class="text-error-emphasis! data-highlighted:before:bg-error-subtle!">
          {@render trashIcon()}
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">On a card</p>
    <ContextMenu>
      <ContextMenuTrigger class="block w-56 cursor-default text-left select-none">
        <div class="bg-background-muted text-foreground-subtle flex aspect-video items-center justify-center rounded-xl">
          {@render photoIcon()}
        </div>
        <p class="text-foreground-intense mt-2 text-sm font-medium">cover-art.png</p>
        <p class="text-foreground-muted text-xs">1.2 MB · PNG</p>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          {@render downloadIcon()}
          Download
        </ContextMenuItem>
        <ContextMenuItem>
          {@render pencilIcon()}
          Rename
        </ContextMenuItem>
        <ContextMenuItem>
          {@render linkIcon()}
          Copy link
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            {@render folderIcon()}
            Move to
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Projects</ContextMenuItem>
            <ContextMenuItem>Archive</ContextMenuItem>
            <ContextMenuItem>Trash</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          {@render starIcon()}
          Add to favorites
        </ContextMenuItem>
        <ContextMenuItem class="text-error-emphasis! data-highlighted:before:bg-error-subtle!">
          {@render trashIcon()}
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Checkbox & radio items</p>
    <ContextMenu>
      <ContextMenuTrigger
        class="bg-background-subtle border-border-strong flex h-40 w-72 items-center justify-center rounded-xl border border-dashed text-sm select-none"
      >
        Right-click the canvas
      </ContextMenuTrigger>
      <ContextMenuContent class="w-50">
        <ContextMenuGroup>
          <ContextMenuGroupLabel>View</ContextMenuGroupLabel>
          <ContextMenuCheckboxItem bind:checked={showGrid}>Show grid</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem bind:checked={showRulers}>Show rulers</ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup bind:value={zoom}>
          <ContextMenuGroupLabel>Zoom</ContextMenuGroupLabel>
          <ContextMenuRadioItem value="fit">Fit to screen</ContextMenuRadioItem>
          <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      {#each SIZES as size (size)}
        <ContextMenu {size}>
          <ContextMenuTrigger
            class="bg-background-subtle border-border-strong flex h-24 w-32 items-center justify-center rounded-xl border border-dashed text-sm select-none"
          >
            {size}
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Paste</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <ContextMenu>
          <ContextMenuTrigger
            class="bg-background-subtle border-border-strong flex h-40 w-72 items-center justify-center rounded-xl border border-dashed text-sm select-none"
          >
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              {@render copyIcon()}
              Copy
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                {@render folderIcon()}
                Move to
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>Projects</ContextMenuItem>
                <ContextMenuItem>Archive</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem class="text-error-emphasis! data-highlighted:before:bg-error-subtle!">
              {@render trashIcon()}
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </DirectionProvider>
  </div>
</section>
