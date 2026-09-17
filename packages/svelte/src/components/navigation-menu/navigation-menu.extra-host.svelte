<script lang="ts">
  import NavigationMenu from './navigation-menu.svelte'
  import NavigationMenuContent from './navigation-menu-content.svelte'
  import NavigationMenuIcon from './navigation-menu-icon.svelte'
  import NavigationMenuItem from './navigation-menu-item.svelte'
  import NavigationMenuLink from './navigation-menu-link.svelte'
  import NavigationMenuList from './navigation-menu-list.svelte'
  import NavigationMenuTrigger from './navigation-menu-trigger.svelte'
  import NavigationMenuViewport from './navigation-menu-viewport.svelte'

  let {
    contentClass,
    nested,
    customViewport,
  }: {
    contentClass?: string
    nested?: boolean
    customViewport?: boolean
  } = $props()
</script>

<NavigationMenu delayDuration={0} aria-label="Main" viewport={!customViewport}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        Products
        <NavigationMenuIcon />
      </NavigationMenuTrigger>
      <NavigationMenuContent class={contentClass}>
        {#if nested}
          <NavigationMenu orientation="vertical" delayDuration={0}>
            <NavigationMenuList class="w-full">
              <NavigationMenuItem class="w-full">
                <NavigationMenuTrigger class="w-full">
                  Handbook
                  <NavigationMenuIcon />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/handbook">Getting started</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        {:else if customViewport}
          <NavigationMenu orientation="vertical" defaultValue="one" viewport={false} delayDuration={0}>
            <NavigationMenuList>
              <NavigationMenuItem value="one">
                <NavigationMenuTrigger>One</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/one">Nested One</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport data-testid="inline-viewport" />
          </NavigationMenu>
        {:else}
          <NavigationMenuLink href="/p/one">Product One</NavigationMenuLink>
        {/if}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
