<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { Menubar as BitsMenubar, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type MenubarSeparatorProps = WithoutChildrenOrChild<BitsMenubar.SeparatorProps>

  let { class: className, ...rest }: MenubarSeparatorProps = $props()
</script>

<BitsMenubar.Separator
  data-slot="menubar-separator"
  class={cn('bg-border -mx-2 my-1.5 h-px shrink-0', className)}
  {...asBitsAttrs(rest)}
/>
