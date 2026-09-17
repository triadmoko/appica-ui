<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Combobox as BitsCombobox, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'
  import { setAutocompleteGroupContext } from './autocomplete-context'

  export type AutocompleteGroupProps = WithoutChildrenOrChild<BitsCombobox.GroupProps> & {
    /** The group's items, so the inner AutocompleteCollection can map them. */
    items?: readonly unknown[]
    children?: Snippet
  }

  let { items = [], children, ...rest }: AutocompleteGroupProps = $props()

  setAutocompleteGroupContext({
    items: () => items,
  })
</script>

<BitsCombobox.Group data-slot="autocomplete-group" {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsCombobox.Group>
