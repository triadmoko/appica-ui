<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Combobox as BitsCombobox } from 'bits-ui'
  import { itemKey } from '../../internal/collection-filter'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getComboboxContext } from './combobox-context'

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /** Items per row in grid mode (defaults to 2 when `grid` is set). */
    cols?: number
    children?: Snippet<[item: unknown, index: number]>
  }

  let { class: className, cols, children, ...rest }: Props = $props()

  const ctx = getComboboxContext()
  const effectiveCols = $derived(cols ?? (ctx.grid ? 2 : undefined))
  const isRenderFn = $derived((children?.length ?? 0) > 0)
  const items = $derived(ctx.filteredItems())
  const staticChildren = $derived(children as unknown as Snippet | undefined)

  $effect(() => {
    ctx.setCols(effectiveCols && effectiveCols > 1 ? effectiveCols : 1)
  })
</script>

<BitsCombobox.Viewport
  data-slot="combobox-list"
  role={ctx.grid && effectiveCols && effectiveCols > 1 ? 'grid' : undefined}
  class={cn(
    'flex max-h-(--bits-combobox-content-available-height) min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-2',
    effectiveCols && effectiveCols > 1 && 'grid',
    className,
  )}
  style={effectiveCols && effectiveCols > 1 ? `grid-template-columns: repeat(${effectiveCols}, minmax(0, 1fr));` : undefined}
  {...asBitsAttrs(rest)}
>
  {#if isRenderFn && ctx.hasItems()}
    {#each items as item, index (itemKey(item, index))}
      {@render children?.(item, index)}
    {/each}
  {:else}
    {@render staticChildren?.()}
  {/if}
</BitsCombobox.Viewport>
