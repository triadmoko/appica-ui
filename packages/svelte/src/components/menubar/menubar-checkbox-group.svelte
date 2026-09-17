<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Menubar as BitsMenubar, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, commitBindableChange } from '../../internal/utils'

  export type MenubarCheckboxGroupProps = WithoutChildrenOrChild<BitsMenubar.CheckboxGroupProps> & {
    /** Controlled selected values. Pair with `onValueChange` or `bind:value`. */
    value?: string[]
    /** Fires when the selected values change. */
    onValueChange?: (value: string[]) => void
    children?: Snippet
  }

  let { value = $bindable(), onValueChange, children, ...rest }: MenubarCheckboxGroupProps = $props()

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

<BitsMenubar.CheckboxGroup
  data-slot="menubar-checkbox-group"
  bind:value={inner}
  onValueChange={handleValueChange}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsMenubar.CheckboxGroup>
