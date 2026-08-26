<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Popover as BitsPopover } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  type Props = HTMLButtonAttributes & {
    children?: Snippet
  }

  let { class: className, disabled, children, ...rest }: Props = $props()
</script>

<BitsPopover.Trigger data-slot="popover-trigger" {disabled} class={cn(className)} {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsPopover.Trigger>
