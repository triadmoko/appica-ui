<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Menubar as BitsMenubar, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'

  export type MenubarGroupProps = WithoutChildrenOrChild<BitsMenubar.GroupProps> & { children?: Snippet }

  let { children, ...rest }: MenubarGroupProps = $props()
</script>

<BitsMenubar.Group data-slot="menubar-group" {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsMenubar.Group>
