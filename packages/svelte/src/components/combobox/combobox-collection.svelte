<script lang="ts">
  import type { Snippet } from 'svelte'
  import { itemKey } from '../../internal/collection-filter'
  import { getComboboxGroupContext } from './combobox-context'

  type Props = {
    children?: Snippet<[item: unknown, index: number]>
  }

  let { children }: Props = $props()

  const group = getComboboxGroupContext()
  const items = $derived(group.items())
</script>

{#each items as item, index (itemKey(item, index))}
  {@render children?.(item, index)}
{/each}
