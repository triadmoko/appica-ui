<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Combobox as BitsCombobox, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'
  import { setComboboxGroupContext } from './combobox-context'

  export type ComboboxGroupProps = WithoutChildrenOrChild<BitsCombobox.GroupProps> & {
    /** The group's items, so the inner ComboboxCollection can map them. */
    items?: readonly unknown[]
    children?: Snippet
  }

  let { items = [], children, ...rest }: ComboboxGroupProps = $props()

  setComboboxGroupContext({
    items: () => items,
  })
</script>

<BitsCombobox.Group data-slot="combobox-group" {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsCombobox.Group>
