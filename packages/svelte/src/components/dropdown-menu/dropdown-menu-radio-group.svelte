<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { DropdownMenu as BitsDropdownMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, commitBindableChange } from '../../internal/utils'

  export type DropdownMenuRadioGroupProps = WithoutChildrenOrChild<BitsDropdownMenu.RadioGroupProps> & {
    /** Controlled selected radio value. Pair with `onValueChange` or `bind:value`. */
    value?: string
    /** Fires when the selected radio changes. */
    onValueChange?: (value: string) => void
    children?: Snippet
  }

  let { value = $bindable(), onValueChange, children, ...rest }: DropdownMenuRadioGroupProps = $props()

  let inner = $state('')
  inner = untrack(() => value ?? '')

  $effect(() => {
    if (value !== undefined) inner = value
  })

  function handleValueChange(next: string) {
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

<BitsDropdownMenu.RadioGroup
  data-slot="dropdown-menu-radio-group"
  bind:value={inner}
  onValueChange={handleValueChange}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsDropdownMenu.RadioGroup>
