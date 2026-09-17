<script lang="ts">
  import {
    DirectionProvider,
    Kbd,
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarGroup,
    MenubarGroupLabel,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
    Switch,
  } from '@appica/ui-svelte'

  const MENUS = ['File', 'Edit', 'View'] as const
  const SIZES = ['sm', 'md', 'lg'] as const

  let dir: 'ltr' | 'rtl' = $state('ltr')
  let toolbar = $state(true)
  let sidebar = $state(false)
  let theme = $state('system')

  type IconName =
    | 'layout'
    | 'folder'
    | 'users'
    | 'settings'
    | 'file-text'
    | 'pencil'
    | 'eye'
    | 'file-plus'
    | 'folder-open'
    | 'download'
    | 'undo'
    | 'redo'
    | 'scissors'
    | 'copy'
    | 'clipboard'
    | 'zoom-in'
    | 'zoom-out'
    | 'maximize'
</script>

{#snippet icon(name: IconName)}
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
    {#if name === 'layout'}
      <rect width="7" height="7" x="3" y="3" rx="1"></rect>
      <rect width="7" height="7" x="14" y="3" rx="1"></rect>
      <rect width="7" height="7" x="14" y="14" rx="1"></rect>
      <rect width="7" height="7" x="3" y="14" rx="1"></rect>
    {:else if name === 'folder'}
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      ></path>
    {:else if name === 'users'}
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    {:else if name === 'settings'}
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      ></path>
      <circle cx="12" cy="12" r="3"></circle>
    {:else if name === 'file-text'}
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
      <path d="M10 9H8"></path>
      <path d="M16 13H8"></path>
      <path d="M16 17H8"></path>
    {:else if name === 'pencil'}
      <path
        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      ></path>
      <path d="M15 5l4 4"></path>
    {:else if name === 'eye'}
      <path
        d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      ></path>
      <circle cx="12" cy="12" r="3"></circle>
    {:else if name === 'file-plus'}
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
      <path d="M9 15h6"></path>
      <path d="M12 18v-6"></path>
    {:else if name === 'folder-open'}
      <path
        d="M6 14l1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
      ></path>
    {:else if name === 'download'}
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" x2="12" y1="15" y2="3"></line>
    {:else if name === 'undo'}
      <polyline points="9 14 4 9 9 4"></polyline>
      <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
    {:else if name === 'redo'}
      <polyline points="15 14 20 9 15 4"></polyline>
      <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
    {:else if name === 'scissors'}
      <circle cx="6" cy="6" r="3"></circle>
      <path d="M8.12 8.12 12 12"></path>
      <path d="M20 4 8.12 15.88"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <path d="M14.8 14.8 20 20"></path>
    {:else if name === 'copy'}
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
    {:else if name === 'clipboard'}
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    {:else if name === 'zoom-in'}
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
      <line x1="11" x2="11" y1="8" y2="14"></line>
      <line x1="8" x2="14" y1="11" y2="11"></line>
    {:else if name === 'zoom-out'}
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
      <line x1="8" x2="14" y1="11" y2="11"></line>
    {:else if name === 'maximize'}
      <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
      <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
      <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
      <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
    {/if}
  </svg>
{/snippet}

{#snippet shortcut(keys: string)}
  <Kbd size="sm" class="ms-auto">{keys}</Kbd>
{/snippet}

{#snippet simpleMenus()}
  {#each MENUS as label (label)}
    <MenubarMenu>
      <MenubarTrigger>{label}</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Action one</MenubarItem>
        <MenubarItem>Action two</MenubarItem>
        <MenubarItem>Action three</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  {/each}
{/snippet}

{#snippet applicationMenus()}
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New file
        {@render shortcut('⌘N')}
      </MenubarItem>
      <MenubarItem>
        Open…
        {@render shortcut('⌘O')}
      </MenubarItem>
      <MenubarSub>
        <MenubarSubTrigger>Open recent</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>project-alpha</MenubarItem>
          <MenubarItem>landing-page</MenubarItem>
          <MenubarItem>design-system</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>
        Save
        {@render shortcut('⌘S')}
      </MenubarItem>
      <MenubarItem>
        Save as…
        {@render shortcut('⇧⌘S')}
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Undo
        {@render shortcut('⌘Z')}
      </MenubarItem>
      <MenubarItem>
        Redo
        {@render shortcut('⇧⌘Z')}
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Cut</MenubarItem>
      <MenubarItem>Copy</MenubarItem>
      <MenubarItem>Paste</MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Zoom in</MenubarItem>
      <MenubarItem>Zoom out</MenubarItem>
      <MenubarItem>Reset zoom</MenubarItem>
      <MenubarSeparator />
      <MenubarItem disabled>Enter full screen</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Menubar</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Application menu</p>
    <Menubar aria-label="Application">
      {@render applicationMenus()}
    </Menubar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="flex flex-col items-center gap-8">
      <Menubar variant="pill" aria-label="Pill menubar">
        {@render simpleMenus()}
      </Menubar>
      <Menubar variant="line" aria-label="Line menubar">
        {@render simpleMenus()}
      </Menubar>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-col items-center gap-6">
      {#each SIZES as size (size)}
        <Menubar {size} aria-label="{size} menubar">
          {@render simpleMenus()}
        </Menubar>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Vertical</p>
    <Menubar orientation="vertical" aria-label="Workspace" class="w-35">
      <MenubarMenu>
        <MenubarTrigger>
          {@render icon('layout')}
          Overview
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Summary</MenubarItem>
          <MenubarItem>Activity</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          {@render icon('folder')}
          Projects
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All projects</MenubarItem>
          <MenubarItem>New project</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Archived</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          {@render icon('users')}
          Team
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Members</MenubarItem>
          <MenubarItem>Invitations</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          {@render icon('settings')}
          Settings
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>General</MenubarItem>
          <MenubarItem>Billing</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Submenus</p>
    <Menubar aria-label="Application">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New file
            {@render shortcut('⌘N')}
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Open recent</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>project-alpha</MenubarItem>
              <MenubarItem>landing-page</MenubarItem>
              <MenubarItem>design-system</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Clear recent</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Save
            {@render shortcut('⌘S')}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Share</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Copy link</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Export as</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>PDF</MenubarItem>
              <MenubarItem>PNG</MenubarItem>
              <MenubarItem>SVG</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Checkbox and radio items</p>
    <Menubar aria-label="Editor">
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarGroupLabel>Panels</MenubarGroupLabel>
            <MenubarCheckboxItem bind:checked={toolbar}>Toolbar</MenubarCheckboxItem>
            <MenubarCheckboxItem bind:checked={sidebar}>Sidebar</MenubarCheckboxItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarRadioGroup bind:value={theme}>
            <MenubarGroupLabel>Theme</MenubarGroupLabel>
            <MenubarRadioItem value="light">Light</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
            <MenubarRadioItem value="system">System</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Documentation</MenubarItem>
          <MenubarItem>Keyboard shortcuts</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Leading icons</p>
    <Menubar aria-label="Application">
      <MenubarMenu>
        <MenubarTrigger>
          {@render icon('file-text')}
          File
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            {@render icon('file-plus')}
            New file
            {@render shortcut('⌘N')}
          </MenubarItem>
          <MenubarItem>
            {@render icon('folder-open')}
            Open…
            {@render shortcut('⌘O')}
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            {@render icon('download')}
            Save
            {@render shortcut('⌘S')}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          {@render icon('pencil')}
          Edit
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            {@render icon('undo')}
            Undo
          </MenubarItem>
          <MenubarItem>
            {@render icon('redo')}
            Redo
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            {@render icon('scissors')}
            Cut
          </MenubarItem>
          <MenubarItem>
            {@render icon('copy')}
            Copy
          </MenubarItem>
          <MenubarItem>
            {@render icon('clipboard')}
            Paste
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          {@render icon('eye')}
          View
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            {@render icon('zoom-in')}
            Zoom in
          </MenubarItem>
          <MenubarItem>
            {@render icon('zoom-out')}
            Zoom out
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            {@render icon('maximize')}
            Enter full screen
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <Menubar aria-label="Application">
          {@render applicationMenus()}
        </Menubar>
      </div>
    </DirectionProvider>
  </div>
</section>
