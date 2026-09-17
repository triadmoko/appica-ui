<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { NavigationMenu as BitsNavigationMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'

  export type NavigationMenuItemProps = WithoutChildrenOrChild<BitsNavigationMenu.ItemProps> & {
    /** Stable value for this item. Generated if omitted. */
    value?: string
    children?: Snippet
  }

  let { value, children, ...rest }: NavigationMenuItemProps = $props()
</script>

<BitsNavigationMenu.Item data-slot="navigation-menu-item" {value} {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsNavigationMenu.Item>
