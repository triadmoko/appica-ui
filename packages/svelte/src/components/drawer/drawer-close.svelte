<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Dialog as BitsDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type DrawerCloseProps = WithoutChildrenOrChild<BitsDialog.CloseProps> & { children?: Snippet }

  let { class: className, children, ...rest }: DrawerCloseProps = $props()
</script>

<BitsDialog.Close data-slot="drawer-close" class={cn(className)} {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsDialog.Close>
