<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Dialog as BitsDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type DrawerDescriptionProps = WithoutChildrenOrChild<BitsDialog.DescriptionProps> & { children?: Snippet }

  let { class: className, children, ...rest }: DrawerDescriptionProps = $props()
</script>

<BitsDialog.Description
  data-slot="drawer-description"
  class={cn('text-foreground-muted text-sm', className)}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsDialog.Description>
