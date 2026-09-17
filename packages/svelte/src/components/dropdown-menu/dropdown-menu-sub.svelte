<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { DropdownMenu as BitsDropdownMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { commitBindableChange } from '../../internal/utils'

  export type DropdownMenuSubProps = WithoutChildrenOrChild<BitsDropdownMenu.SubProps> & {
    children?: Snippet
  }

  let { open = $bindable(), onOpenChange, children }: DropdownMenuSubProps = $props()

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

<BitsDropdownMenu.Sub bind:open={innerOpen} onOpenChange={handleOpenChange}>
  {@render children?.()}
</BitsDropdownMenu.Sub>
