<script lang="ts">
  import {
    DirectionProvider,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIcon,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    Switch,
  } from '@appica/ui-svelte'

  const PRODUCTS = [
    { title: 'Analytics', description: 'Track usage and conversions in real time.', icon: 'analytics' },
    { title: 'Components', description: 'A composable library of UI primitives.', icon: 'cube' },
    { title: 'Automation', description: 'Wire up workflows without code.', icon: 'bolt' },
    { title: 'Integrations', description: 'Connect the tools your team already uses.', icon: 'code' },
  ] as const

  const RESOURCES = [
    { title: 'Documentation', description: 'Guides and API references.', icon: 'book' },
    { title: 'Support', description: 'Reach our team for help.', icon: 'lifebuoy' },
  ] as const

  const VARIANT_LINKS = ['Overview', 'Changelog', 'Roadmap', 'Releases']
  const SIZE_LINKS = ['Overview', 'Analytics', 'Settings']
  const ICON_LINKS = ['Dashboard', 'Reports', 'Settings']
  const SIZES = ['sm', 'md', 'lg'] as const
  const KINDS = ['chevron', 'caret', 'plus'] as const

  const MENUS = [
    { label: 'Dashboard', icon: 'layout', links: ['Summary', 'Activity', 'Insights'] },
    { label: 'Projects', icon: 'folder', links: ['All projects', 'Archived', 'Templates'] },
    { label: 'Team', icon: 'users', links: ['Members', 'Roles', 'Invitations'] },
  ] as const

  const BACKDROP_PRODUCTS = [
    { title: 'Analytics', description: 'Track usage and conversions.' },
    { title: 'Components', description: 'A composable UI library.' },
    { title: 'Automation', description: 'Wire up workflows fast.' },
    { title: 'Integrations', description: 'Connect your stack.' },
  ]

  const COMPANY = [
    { title: 'About', description: 'Our mission and the team behind it.' },
    { title: 'Careers', description: 'Open roles across the company.' },
    { title: 'Blog', description: 'Product news and engineering notes.' },
  ]

  const HANDBOOK = [
    { title: 'Getting started', description: 'Set up your workspace.' },
    { title: 'Principles', description: 'How we make decisions.' },
    { title: 'Remote work', description: 'Working across time zones.' },
  ]

  const AUDIENCES = [
    {
      value: 'developers',
      label: 'Developers',
      hint: 'Build and ship faster',
      title: 'For developers',
      description: 'APIs, SDKs, and primitives to integrate in minutes.',
      links: [
        { title: 'API reference', description: 'Every endpoint, documented.' },
        { title: 'SDKs', description: 'First-party libraries for your stack.' },
        { title: 'Examples', description: 'Copy-paste starting points.' },
      ],
    },
    {
      value: 'designers',
      label: 'Designers',
      hint: 'Design with the system',
      title: 'For designers',
      description: 'Tokens, kits, and guidelines that match the code.',
      links: [
        { title: 'Figma kit', description: 'Components mapped to production.' },
        { title: 'Design tokens', description: 'One source of truth for theming.' },
        { title: 'Guidelines', description: 'Patterns and accessibility notes.' },
      ],
    },
    {
      value: 'teams',
      label: 'Teams',
      hint: 'Scale across the org',
      title: 'For teams',
      description: 'Roles, governance, and shared workspaces.',
      links: [
        { title: 'Permissions', description: 'Granular role-based access.' },
        { title: 'Audit log', description: 'Track every change.' },
        { title: 'SSO', description: 'Single sign-on for everyone.' },
      ],
    },
  ]

  const cardClass = 'h-auto flex-col items-start gap-1 whitespace-normal'
  const inlineCardClass = 'h-auto flex-col items-start gap-0.5 whitespace-normal'

  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

{#snippet namedIcon(name: string, icon?: 'start')}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    data-icon={icon}
  >
    {#if name === 'analytics'}
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      <path d="M7 17v-4"></path>
      <path d="M12 17v-8"></path>
      <path d="M17 17v-2"></path>
    {:else if name === 'cube'}
      <path
        d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
      ></path>
      <path d="m3.3 7 8.7 5 8.7-5"></path>
      <path d="M12 22V12"></path>
    {:else if name === 'bolt'}
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
    {:else if name === 'code'}
      <path d="m16 18 6-6-6-6"></path>
      <path d="m8 6-6 6 6 6"></path>
    {:else if name === 'book'}
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path>
    {:else if name === 'lifebuoy'}
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="m4.9 4.9 4.2 4.2"></path>
      <path d="m14.9 14.9 4.2 4.2"></path>
      <path d="m14.9 9.1 4.2-4.2"></path>
      <path d="m9.1 14.9-4.2 4.2"></path>
    {:else if name === 'layout'}
      <rect width="7" height="9" x="3" y="3" rx="1"></rect>
      <rect width="7" height="5" x="14" y="3" rx="1"></rect>
      <rect width="7" height="9" x="14" y="12" rx="1"></rect>
      <rect width="7" height="5" x="3" y="16" rx="1"></rect>
    {:else if name === 'folder'}
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      ></path>
    {:else if name === 'users'}
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    {/if}
  </svg>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Navigation menu</h2>

  <label class="flex items-center gap-2 text-sm">
    <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
    RTL
  </label>

  <DirectionProvider {dir}>
    <div {dir} class="flex flex-col gap-8">
      <div class="flex flex-col gap-2">
        <p class="text-foreground-muted text-sm">Default</p>
        <NavigationMenu aria-label="Main">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Products
                <NavigationMenuIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-96 grid-cols-2 gap-0.5">
                  {#each PRODUCTS as product (product.title)}
                    <li>
                      <NavigationMenuLink href="#!" class={cardClass}>
                        <span class="text-foreground-intense flex items-center gap-1.5 font-medium">
                          {@render namedIcon(product.icon)}
                          {product.title}
                        </span>
                        <span class="text-foreground-muted text-xs font-normal">{product.description}</span>
                      </NavigationMenuLink>
                    </li>
                  {/each}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Resources
                <NavigationMenuIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="w-50 gap-0.5">
                  {#each RESOURCES as resource (resource.title)}
                    <li>
                      <NavigationMenuLink href="#!" class={cardClass}>
                        <span class="text-foreground-intense flex items-center gap-1.5 font-medium">
                          {@render namedIcon(resource.icon)}
                          {resource.title}
                        </span>
                        <span class="text-foreground-muted text-xs font-normal">{resource.description}</span>
                      </NavigationMenuLink>
                    </li>
                  {/each}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#!">Pricing</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-foreground-muted text-sm">Variants</p>
        <div class="flex flex-col gap-8">
          {#each [{ variant: 'pill' as const, label: 'Pill' }, { variant: 'line' as const, label: 'Line' }] as item (item.variant)}
            <NavigationMenu aria-label={item.label} variant={item.variant}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    Product
                    <NavigationMenuIcon />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul class="w-50 gap-0.5">
                      {#each VARIANT_LINKS as link (link)}
                        <li>
                          <NavigationMenuLink href="#!">{link}</NavigationMenuLink>
                        </li>
                      {/each}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#!">Pricing</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          {/each}
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-foreground-muted text-sm">Sizes</p>
        <div class="flex flex-wrap items-center gap-6">
          {#each SIZES as size (size)}
            <NavigationMenu aria-label={size} {size}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {size}
                    <NavigationMenuIcon />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul class="w-50 gap-0.5">
                      {#each SIZE_LINKS as item (item)}
                        <li>
                          <NavigationMenuLink href="#!">{item}</NavigationMenuLink>
                        </li>
                      {/each}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          {/each}
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-foreground-muted text-sm">Indicator</p>
        <div class="flex flex-wrap gap-6">
          {#each KINDS as kind (kind)}
            <NavigationMenu aria-label={kind} icon={kind}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {kind}
                    <NavigationMenuIcon />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul class="w-50 gap-0.5">
                      {#each ICON_LINKS as item (item)}
                        <li>
                          <NavigationMenuLink href="#!">{item}</NavigationMenuLink>
                        </li>
                      {/each}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          {/each}
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-foreground-muted text-sm">Vertical</p>
        <NavigationMenu aria-label="Sidebar" orientation="vertical" class="w-48">
          <NavigationMenuList>
            {#each MENUS as menu (menu.label)}
              <NavigationMenuItem>
                <NavigationMenuTrigger class="w-full justify-start">
                  {@render namedIcon(menu.icon, 'start')}
                  {menu.label}
                  <NavigationMenuIcon class="ms-auto" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul class="w-48 gap-0.5">
                    {#each menu.links as link (link)}
                      <li>
                        <NavigationMenuLink href="#!">{link}</NavigationMenuLink>
                      </li>
                    {/each}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            {/each}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-foreground-muted text-sm">Backdrop</p>
        <NavigationMenu aria-label="Main" backdrop>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Products
                <NavigationMenuIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-94 grid-cols-2 gap-0.5">
                  {#each BACKDROP_PRODUCTS as product (product.title)}
                    <li>
                      <NavigationMenuLink href="#!" class={cardClass}>
                        <span class="text-foreground-intense font-medium">{product.title}</span>
                        <span class="text-foreground-muted text-xs font-normal">{product.description}</span>
                      </NavigationMenuLink>
                    </li>
                  {/each}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#!">Pricing</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-foreground-muted text-sm">Nested submenus</p>
        <NavigationMenu aria-label="Main">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Company
                <NavigationMenuIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="w-58 gap-0.5">
                  {#each COMPANY as item (item.title)}
                    <li>
                      <NavigationMenuLink href="#!" class={cardClass}>
                        <span class="text-foreground-intense font-medium">{item.title}</span>
                        <span class="text-foreground-muted text-xs font-normal">{item.description}</span>
                      </NavigationMenuLink>
                    </li>
                  {/each}
                  <li>
                    <NavigationMenu orientation="vertical">
                      <NavigationMenuList class="w-full">
                        <NavigationMenuItem class="w-full">
                          <NavigationMenuTrigger class="h-auto w-full whitespace-normal">
                            <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                              <span class="text-foreground-intense font-medium">Handbook</span>
                              <span class="text-foreground-muted text-xs font-normal">
                                How the team works, day to day.
                              </span>
                            </span>
                            <NavigationMenuIcon />
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul class="w-50 gap-0.5">
                              {#each HANDBOOK as item (item.title)}
                                <li>
                                  <NavigationMenuLink href="#!" class={cardClass}>
                                    <span class="text-foreground-intense font-medium">{item.title}</span>
                                    <span class="text-foreground-muted text-xs font-normal">{item.description}</span>
                                  </NavigationMenuLink>
                                </li>
                              {/each}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#!">Pricing</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-foreground-muted text-sm">Nested inline submenus</p>
        <NavigationMenu aria-label="Main">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Product
                <NavigationMenuIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent class="p-0">
                <NavigationMenu orientation="vertical" defaultValue="developers" viewport={false}>
                  <div class="grid w-125 grid-cols-[13rem_minmax(0,1fr)]">
                    <NavigationMenuList class="border-border w-full flex-col items-stretch gap-1 border-e p-2">
                      {#each AUDIENCES as menu (menu.value)}
                        <NavigationMenuItem value={menu.value} class="w-full">
                          <NavigationMenuTrigger class="w-full {inlineCardClass}">
                            <span class="text-foreground-intense font-medium">{menu.label}</span>
                            <span class="text-foreground-muted text-xs font-normal">{menu.hint}</span>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent class="p-0">
                            <div class="flex flex-col gap-3 p-2">
                              <div class="px-3 pt-1">
                                <h4 class="text-foreground-intense m-0 font-semibold">{menu.title}</h4>
                                <p class="text-foreground-muted m-0 mt-0.5 text-sm">{menu.description}</p>
                              </div>
                              <ul class="grid gap-1">
                                {#each menu.links as link (link.title)}
                                  <li>
                                    <NavigationMenuLink href="#!" class={inlineCardClass}>
                                      <span class="text-foreground-emphasis font-medium">{link.title}</span>
                                      <span class="text-foreground-muted text-xs font-normal">{link.description}</span>
                                    </NavigationMenuLink>
                                  </li>
                                {/each}
                              </ul>
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      {/each}
                    </NavigationMenuList>
                    <NavigationMenuViewport class="min-h-60" />
                  </div>
                </NavigationMenu>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#!">Pricing</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  </DirectionProvider>
</section>
