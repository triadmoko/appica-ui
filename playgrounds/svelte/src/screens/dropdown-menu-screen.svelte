<script lang="ts">
  import {
    Avatar,
    AvatarFallback,
    Badge,
    DirectionProvider,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuGroupLabel,
    DropdownMenuItem,
    DropdownMenuLinkItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    Kbd,
    ScrollArea,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    buttonVariants,
  } from '@appica/ui-svelte'

  const WORKSPACES = [
    'Acme Corp',
    'Globex',
    'Initech',
    'Umbrella',
    'Stark Industries',
    'Wayne Enterprises',
    'Soylent',
    'Hooli',
    'Pied Piper',
    'Wonka Industries',
    'Cyberdyne',
    'Aperture Science',
  ]

  type ColumnKey = 'email' | 'role' | 'status'

  const COLUMNS: { key: ColumnKey; label: string }[] = [
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ]

  const ROWS: { name: string; email: string; role: string; status: string }[] = [
    { name: 'Sarah Jenkins', email: 'sarah@appica.dev', role: 'Admin', status: 'Active' },
    { name: 'Liam Hudson', email: 'liam@appica.dev', role: 'Editor', status: 'Invited' },
    { name: 'Mateo Rossi', email: 'mateo@appica.dev', role: 'Viewer', status: 'Active' },
  ]

  const SIZES = ['sm', 'md', 'lg'] as const

  const PLACEMENTS = [
    { side: 'top', align: 'start' },
    { side: 'right', align: 'center' },
    { side: 'bottom', align: 'end' },
    { side: 'left', align: 'center' },
  ] as const

  const CHEVRON_CLASS =
    'transition-transform duration-200 ease-out group-data-popup-open/trigger:rotate-180 motion-reduce:transition-none'

  let darkMode = $state(false)
  let visible = $state<Record<ColumnKey, boolean>>({
    email: true,
    role: true,
    status: false,
  })
  let sortBy = $state('recent')
  let dir: 'ltr' | 'rtl' = $state('ltr')

  const shown = $derived(COLUMNS.filter((column) => visible[column.key]))
</script>

{#snippet strokeIcon(icon: 'start' | 'end', extraClass: string | undefined, content: import('svelte').Snippet)}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    data-icon={icon}
    class={extraClass}
    aria-hidden="true"
  >
    {@render content()}
  </svg>
{/snippet}

{#snippet userCirclePaths()}
  <circle cx="12" cy="8" r="4"></circle>
  <path d="M4 20c0-4 4-6 8-6s8 2 8 6"></path>
{/snippet}
{#snippet userCircle()}
  {@render strokeIcon('start', undefined, userCirclePaths)}
{/snippet}

{#snippet shoppingBagPaths()}
  <path d="M6 7h12l1 13H5L6 7Z"></path>
  <path d="M9 7V6a3 3 0 0 1 6 0v1"></path>
{/snippet}
{#snippet shoppingBag()}
  {@render strokeIcon('start', undefined, shoppingBagPaths)}
{/snippet}

{#snippet heartPaths()}
  <path
    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  ></path>
{/snippet}
{#snippet heart()}
  {@render strokeIcon('start', undefined, heartPaths)}
{/snippet}

{#snippet messagePaths()}
  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
{/snippet}
{#snippet message()}
  {@render strokeIcon('start', undefined, messagePaths)}
{/snippet}

{#snippet layoutDashboardPaths()}
  <rect width="7" height="9" x="3" y="3" rx="1"></rect>
  <rect width="7" height="5" x="14" y="3" rx="1"></rect>
  <rect width="7" height="9" x="14" y="12" rx="1"></rect>
  <rect width="7" height="5" x="3" y="16" rx="1"></rect>
{/snippet}
{#snippet layoutDashboard()}
  {@render strokeIcon('start', undefined, layoutDashboardPaths)}
{/snippet}

{#snippet settingsPaths()}
  <path
    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
  ></path>
  <circle cx="12" cy="12" r="3"></circle>
{/snippet}
{#snippet settings()}
  {@render strokeIcon('start', undefined, settingsPaths)}
{/snippet}

{#snippet bellPaths()}
  <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
  <path
    d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
  ></path>
{/snippet}
{#snippet bell()}
  {@render strokeIcon('start', undefined, bellPaths)}
{/snippet}

{#snippet moonPaths()}
  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  <path d="M19 3v4"></path>
  <path d="M21 5h-4"></path>
{/snippet}
{#snippet moon()}
  {@render strokeIcon('start', undefined, moonPaths)}
{/snippet}

{#snippet logoutPaths()}
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
  <polyline points="16 17 21 12 16 7"></polyline>
  <line x1="21" x2="9" y1="12" y2="12"></line>
{/snippet}
{#snippet logout()}
  {@render strokeIcon('start', undefined, logoutPaths)}
{/snippet}

{#snippet idBadgePaths()}
  <path d="M16 10h2"></path>
  <path d="M16 14h2"></path>
  <path d="M6.17 15a3 3 0 0 1 5.66 0"></path>
  <circle cx="9" cy="11" r="2"></circle>
  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
{/snippet}
{#snippet idBadge()}
  {@render strokeIcon('start', undefined, idBadgePaths)}
{/snippet}

{#snippet creditCardPaths()}
  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
  <line x1="2" x2="22" y1="10" y2="10"></line>
{/snippet}
{#snippet creditCard()}
  {@render strokeIcon('start', undefined, creditCardPaths)}
{/snippet}

{#snippet mapPinPaths()}
  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
  <circle cx="12" cy="10" r="3"></circle>
{/snippet}
{#snippet mapPin()}
  {@render strokeIcon('start', undefined, mapPinPaths)}
{/snippet}

{#snippet chevronDownPaths()}
  <path d="m6 9 6 6 6-6"></path>
{/snippet}
{#snippet chevronDown()}
  {@render strokeIcon('end', CHEVRON_CLASS, chevronDownPaths)}
{/snippet}

{#snippet userPaths()}
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
  <circle cx="12" cy="7" r="4"></circle>
{/snippet}
{#snippet user()}
  {@render strokeIcon('start', undefined, userPaths)}
{/snippet}

{#snippet copyPaths()}
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
{/snippet}
{#snippet copy()}
  {@render strokeIcon('start', undefined, copyPaths)}
{/snippet}

{#snippet pencilPaths()}
  <path
    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
  ></path>
{/snippet}
{#snippet pencil()}
  {@render strokeIcon('start', undefined, pencilPaths)}
{/snippet}

{#snippet trashPaths()}
  <path d="M3 6h18"></path>
  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
{/snippet}
{#snippet trash()}
  {@render strokeIcon('start', undefined, trashPaths)}
{/snippet}

{#snippet layoutColumnsPaths()}
  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
  <path d="M9 3v18"></path>
{/snippet}
{#snippet layoutColumns()}
  {@render strokeIcon('start', undefined, layoutColumnsPaths)}
{/snippet}

{#snippet userPlusPaths()}
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
  <circle cx="9" cy="7" r="4"></circle>
  <line x1="19" x2="19" y1="8" y2="14"></line>
  <line x1="22" x2="16" y1="11" y2="11"></line>
{/snippet}
{#snippet userPlus()}
  {@render strokeIcon('start', undefined, userPlusPaths)}
{/snippet}

{#snippet mailPaths()}
  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
{/snippet}
{#snippet mail()}
  {@render strokeIcon('start', undefined, mailPaths)}
{/snippet}

{#snippet messageCirclePaths()}
  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
{/snippet}
{#snippet messageCircle()}
  {@render strokeIcon('start', undefined, messageCirclePaths)}
{/snippet}

{#snippet linkPaths()}
  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
{/snippet}
{#snippet link()}
  {@render strokeIcon('start', undefined, linkPaths)}
{/snippet}

{#snippet bookPaths()}
  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
{/snippet}
{#snippet book()}
  {@render strokeIcon('start', undefined, bookPaths)}
{/snippet}

{#snippet gitBranchPaths()}
  <line x1="6" x2="6" y1="3" y2="15"></line>
  <circle cx="18" cy="6" r="3"></circle>
  <circle cx="6" cy="18" r="3"></circle>
  <path d="M18 9a9 9 0 0 1-9 9"></path>
{/snippet}
{#snippet gitBranch()}
  {@render strokeIcon('start', undefined, gitBranchPaths)}
{/snippet}

{#snippet arrowUpRightPaths()}
  <path d="M7 7h10v10"></path>
  <path d="M7 17 17 7"></path>
{/snippet}
{#snippet arrowUpRight()}
  {@render strokeIcon('end', 'ms-auto', arrowUpRightPaths)}
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Dropdown menu</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Usage</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={buttonVariants({ variant: 'outline' })}>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>My Account</DropdownMenuGroupLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Account menu</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={buttonVariants()}>
          {@render userCircle()}
          My account
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-64">
          <div class="flex gap-3 px-2.5 pt-2.5 pb-1.5">
            <Avatar size="sm">
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div class="min-w-0 flex-1">
              <p class="text-foreground-intense truncate text-sm font-semibold">Sarah Jenkins</p>
              <p class="text-foreground-muted truncate text-xs">sarah@appica.dev</p>
            </div>
            <Badge variant="secondary" size="sm">User</Badge>
          </div>

          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Personal</DropdownMenuGroupLabel>
            <DropdownMenuItem>
              {@render userCircle()}
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              {@render shoppingBag()}
              My Orders
              <Badge variant="outline" size="sm" class="ms-auto">2</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {@render heart()}
              Wishlist
            </DropdownMenuItem>
            <DropdownMenuItem>
              {@render message()}
              Messages
              <Badge variant="outline" size="sm" class="ms-auto">5</Badge>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Management</DropdownMenuGroupLabel>
            <DropdownMenuItem>
              {@render layoutDashboard()}
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {@render settings()}
                Settings
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  {@render idBadge()}
                  Personal Info
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {@render creditCard()}
                  Payments
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {@render mapPin()}
                  Addresses
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              {@render bell()}
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem closeOnClick={false} onclick={() => (darkMode = !darkMode)}>
              {@render moon()}
              Dark Mode
              <Switch checked={darkMode} tabindex={-1} aria-hidden="true" class="pointer-events-none ms-auto" />
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            {@render logout()}
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Icons, shortcuts and animated chevron</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={['group/trigger', buttonVariants({ variant: 'outline' })]}>
          Actions
          {@render chevronDown()}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            {@render user()}
            Profile
            <Kbd size="sm" class="ms-auto">⇧⌘P</Kbd>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {@render copy()}
            Duplicate
            <Kbd size="sm" class="ms-auto">⌘D</Kbd>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {@render pencil()}
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-error-emphasis! data-highlighted:before:bg-error-subtle!">
            {@render trash()}
            Delete
            <Kbd size="sm" class="ms-auto">⌫</Kbd>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Groups and labels</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={buttonVariants({ variant: 'outline' })}>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Account</DropdownMenuGroupLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Team</DropdownMenuGroupLabel>
            <DropdownMenuItem>Invite members</DropdownMenuItem>
            <DropdownMenuItem>New workspace</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Scrollable</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={['group/trigger', buttonVariants({ variant: 'outline' })]}>
          Switch workspace
          {@render chevronDown()}
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-60">
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Workspaces</DropdownMenuGroupLabel>
            <ScrollArea class="-mx-2 max-h-64" scrollbarVisibility="always" viewportProps={{ class: 'px-2' }}>
              <div class="flex flex-col gap-0.5">
                {#each WORKSPACES as name (name)}
                  <DropdownMenuItem>
                    <Avatar size="sm" data-icon="start">
                      <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    {name}
                  </DropdownMenuItem>
                {/each}
              </div>
            </ScrollArea>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Checkbox items (controlled)</p>
    <div class="flex w-full max-w-125 flex-col gap-3">
      <div class="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger class={['group/trigger', buttonVariants({ variant: 'outline' })]}>
            {@render layoutColumns()}
            Columns
            {@render chevronDown()}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuGroupLabel>Toggle columns</DropdownMenuGroupLabel>
              {#each COLUMNS as column (column.key)}
                <DropdownMenuCheckboxItem
                  checked={visible[column.key]}
                  onCheckedChange={(checked) => (visible = { ...visible, [column.key]: checked })}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              {/each}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea
        orientation="horizontal"
        scrollbarVisibility="auto"
        class="[&_td]:whitespace-nowrap [&_th]:whitespace-nowrap"
      >
        <Table hoverableRows>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {#each shown as column (column.key)}
                <TableHead>{column.label}</TableHead>
              {/each}
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each ROWS as row (row.email)}
              <TableRow>
                <TableCell class="text-foreground-intense font-medium">{row.name}</TableCell>
                {#each shown as column (column.key)}
                  <TableCell>{row[column.key]}</TableCell>
                {/each}
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Radio items</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={buttonVariants({ variant: 'outline' })}>Sort by</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup bind:value={sortBy}>
            <DropdownMenuGroupLabel>Sort order</DropdownMenuGroupLabel>
            <DropdownMenuRadioItem value="recent">Most recent</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="popular">Most popular</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Submenus</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={buttonVariants({ variant: 'outline' })}>Share</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Copy link</DropdownMenuItem>
          <DropdownMenuItem>Embed</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {@render userPlus()}
              Invite people
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                {@render mail()}
                Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                {@render messageCircle()}
                Message
              </DropdownMenuItem>
              <DropdownMenuItem>
                {@render link()}
                Invite link
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Open on hover</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={['group/trigger', buttonVariants({ variant: 'outline' })]} openOnHover delay={100}>
          Hover me
          {@render chevronDown()}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            {@render user()}
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            {@render settings()}
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {@render logout()}
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Link items</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger class={buttonVariants({ variant: 'outline' })}>Go to</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLinkItem href="#dashboard">
            {@render layoutDashboard()}
            Dashboard
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem href="#settings">
            {@render settings()}
            Settings
          </DropdownMenuLinkItem>
          <DropdownMenuSeparator />
          <DropdownMenuLinkItem href="https://base-ui.com" target="_blank" rel="noreferrer">
            {@render book()}
            Documentation
            {@render arrowUpRight()}
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem href="https://github.com" target="_blank" rel="noreferrer">
            {@render gitBranch()}
            Source code
            {@render arrowUpRight()}
          </DropdownMenuLinkItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      {#each SIZES as size (size)}
        <DropdownMenu {size}>
          <DropdownMenuTrigger class={buttonVariants({ variant: 'outline', size })}>{size}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Side and alignment</p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      {#each PLACEMENTS as { side, align } (`${side}-${align}`)}
        <DropdownMenu>
          <DropdownMenuTrigger class={buttonVariants({ variant: 'outline' })}>{side} / {align}</DropdownMenuTrigger>
          <DropdownMenuContent {side} {align}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="flex flex-wrap items-center justify-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger class={buttonVariants({ variant: 'outline' })}>Account</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              {@render user()}
              Profile
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {@render settings()}
                Settings
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Personal Info</DropdownMenuItem>
                <DropdownMenuItem>Payments</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {@render logout()}
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </DirectionProvider>
  </div>
</section>
