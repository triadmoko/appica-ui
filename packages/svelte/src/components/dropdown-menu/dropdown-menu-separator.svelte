<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { DropdownMenu as BitsDropdownMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type DropdownMenuSeparatorProps = WithoutChildrenOrChild<BitsDropdownMenu.SeparatorProps>

  let { class: className, ...rest }: DropdownMenuSeparatorProps = $props()
</script>

<BitsDropdownMenu.Separator
  data-slot="dropdown-menu-separator"
  class={cn('bg-border -mx-2 my-1.5 h-px shrink-0', className)}
  {...asBitsAttrs(rest)}
/>
