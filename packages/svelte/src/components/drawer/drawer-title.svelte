<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Dialog as BitsDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type DrawerTitleProps = WithoutChildrenOrChild<BitsDialog.TitleProps> & { children?: Snippet }

  let { class: className, children, ...rest }: DrawerTitleProps = $props()
</script>

<BitsDialog.Title
  data-slot="drawer-title"
  class={cn('text-foreground-intense text-2xl font-semibold', className)}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsDialog.Title>
