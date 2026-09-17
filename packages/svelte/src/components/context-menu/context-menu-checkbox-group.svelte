<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { ContextMenu as BitsContextMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, commitBindableChange } from '../../internal/utils'

  export type ContextMenuCheckboxGroupProps = WithoutChildrenOrChild<BitsContextMenu.CheckboxGroupProps> & {
    /** Controlled selected values. Pair with `onValueChange` or `bind:value`. */
    value?: string[]
    /** Fires when the selected values change. */
    onValueChange?: (value: string[]) => void
    children?: Snippet
  }

  let { value = $bindable(), onValueChange, children, ...rest }: ContextMenuCheckboxGroupProps = $props()

  let inner = $state<string[]>([])
  inner = untrack(() => value ?? [])

  $effect(() => {
    if (value !== undefined) inner = value
  })

  function handleValueChange(next: string[]) {
    commitBindableChange({
      next,
      bound: value,
      setBound: (nextValue) => {
        value = nextValue
      },
      setInner: (nextValue) => {
        inner = nextValue
      },
      onChange: onValueChange,
    })
  }
</script>

<BitsContextMenu.CheckboxGroup
  data-slot="context-menu-checkbox-group"
  bind:value={inner}
  onValueChange={handleValueChange}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsContextMenu.CheckboxGroup>
