<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { ContextMenu as BitsContextMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type ContextMenuSeparatorProps = WithoutChildrenOrChild<BitsContextMenu.SeparatorProps>

  let { class: className, ...rest }: ContextMenuSeparatorProps = $props()
</script>

<BitsContextMenu.Separator
  data-slot="context-menu-separator"
  class={cn('bg-border -mx-2 my-1.5 h-px shrink-0', className)}
  {...asBitsAttrs(rest)}
/>
