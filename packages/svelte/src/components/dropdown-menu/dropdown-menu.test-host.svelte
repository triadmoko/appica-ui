<script lang="ts">
  import DropdownMenu from './dropdown-menu.svelte'
  import DropdownMenuTrigger from './dropdown-menu-trigger.svelte'
  import DropdownMenuContent from './dropdown-menu-content.svelte'
  import DropdownMenuGroup from './dropdown-menu-group.svelte'
  import DropdownMenuGroupLabel from './dropdown-menu-group-label.svelte'
  import DropdownMenuItem from './dropdown-menu-item.svelte'
  import DropdownMenuLinkItem from './dropdown-menu-link-item.svelte'
  import DropdownMenuRadioGroup from './dropdown-menu-radio-group.svelte'
  import DropdownMenuRadioItem from './dropdown-menu-radio-item.svelte'
  import DropdownMenuSeparator from './dropdown-menu-separator.svelte'
  import DropdownMenuSub from './dropdown-menu-sub.svelte'
  import DropdownMenuSubTrigger from './dropdown-menu-sub-trigger.svelte'
  import DropdownMenuSubContent from './dropdown-menu-sub-content.svelte'
  import type { DropdownMenuAlign, DropdownMenuSide } from './dropdown-menu-variants'

  let {
    radio = $bindable('one'),
    closeOnClick = true,
    openOnHover = false,
    delay = 100,
    side = 'bottom',
    align = 'start',
  }: {
    radio?: string
    closeOnClick?: boolean
    openOnHover?: boolean
    delay?: number
    side?: DropdownMenuSide
    align?: DropdownMenuAlign
  } = $props()
</script>

<DropdownMenu>
  <DropdownMenuTrigger {openOnHover} {delay}>Open</DropdownMenuTrigger>
  <DropdownMenuContent {side} {align}>
    <DropdownMenuGroup>
      <DropdownMenuGroupLabel>Actions</DropdownMenuGroupLabel>
      <DropdownMenuItem {closeOnClick}>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem disabled>Disabled</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuLinkItem href="https://example.com">Docs</DropdownMenuLinkItem>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup bind:value={radio}>
      <DropdownMenuRadioItem value="one">One</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="two">Two</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Nested</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
