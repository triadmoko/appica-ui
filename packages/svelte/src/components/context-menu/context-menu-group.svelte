<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { ContextMenu as BitsContextMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'

  export type ContextMenuGroupProps = WithoutChildrenOrChild<BitsContextMenu.GroupProps> & { children?: Snippet }

  let { children, ...rest }: ContextMenuGroupProps = $props()
</script>

<BitsContextMenu.Group data-slot="context-menu-group" {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsContextMenu.Group>
