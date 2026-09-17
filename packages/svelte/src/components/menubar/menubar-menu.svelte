<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Menubar as BitsMenubar, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'

  export type MenubarMenuProps = WithoutChildrenOrChild<BitsMenubar.MenuProps> & {
    children?: Snippet
  }

  let { value, onOpenChange, children, ...rest }: MenubarMenuProps = $props()
</script>

<BitsMenubar.Menu {value} {onOpenChange} {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsMenubar.Menu>
