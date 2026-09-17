<script lang="ts">
  import type { Snippet } from 'svelte'
  import { itemKey } from '../../internal/collection-filter'
  import { getComboboxGroupContext } from './combobox-context'

  export type ComboboxCollectionProps = {
    children?: Snippet<[item: unknown, index: number]>
  }

  let { children }: ComboboxCollectionProps = $props()

  const group = getComboboxGroupContext()
  const items = $derived(group.items())
</script>

{#each items as item, index (itemKey(item, index))}
  {@render children?.(item, index)}
{/each}
