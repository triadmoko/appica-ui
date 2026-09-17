<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { ContextMenu as BitsContextMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { commitBindableChange } from '../../internal/utils'

  export type ContextMenuSubProps = WithoutChildrenOrChild<BitsContextMenu.SubProps> & {
    children?: Snippet
  }

  let { open = $bindable(), onOpenChange, children }: ContextMenuSubProps = $props()

  let innerOpen = $state(false)
  innerOpen = untrack(() => open ?? false)

  $effect(() => {
    if (open !== undefined) innerOpen = open
  })

  function handleOpenChange(next: boolean) {
    commitBindableChange({
      next,
      bound: open,
      setBound: (value) => {
        open = value
      },
      setInner: (value) => {
        innerOpen = value
      },
      onChange: onOpenChange,
    })
  }
</script>

<BitsContextMenu.Sub bind:open={innerOpen} onOpenChange={handleOpenChange}>
  {@render children?.()}
</BitsContextMenu.Sub>
