<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { ContextMenu as BitsContextMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getContextMenuContext } from './context-menu-context'

  export type ContextMenuTriggerProps = WithoutChildrenOrChild<BitsContextMenu.TriggerProps> & {
    disabled?: boolean
    children?: Snippet
  }

  let { class: className, disabled, children, ...rest }: ContextMenuTriggerProps = $props()

  const ctx = getContextMenuContext()
  const isDisabled = $derived(disabled || ctx.disabled)
</script>

<BitsContextMenu.Trigger data-slot="context-menu-trigger" disabled={isDisabled} class={cn(className)} {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsContextMenu.Trigger>
