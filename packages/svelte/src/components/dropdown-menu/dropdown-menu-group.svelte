<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { DropdownMenu as BitsDropdownMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'

  export type DropdownMenuGroupProps = WithoutChildrenOrChild<BitsDropdownMenu.GroupProps> & { children?: Snippet }

  let { children, ...rest }: DropdownMenuGroupProps = $props()
</script>

<BitsDropdownMenu.Group data-slot="dropdown-menu-group" {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsDropdownMenu.Group>
