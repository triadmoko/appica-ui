<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Popover as BitsPopover, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type PopoverCloseProps = WithoutChildrenOrChild<BitsPopover.CloseProps> & {
    children?: Snippet
  }

  let { class: className, children, ...rest }: PopoverCloseProps = $props()
</script>

<BitsPopover.Close data-slot="popover-close" class={cn(className)} {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsPopover.Close>
