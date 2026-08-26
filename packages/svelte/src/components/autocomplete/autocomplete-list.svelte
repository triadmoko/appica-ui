<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Combobox as BitsCombobox } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getAutocompleteContext } from './autocomplete-context'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /** Columns when `grid` is set on the root. */
    cols?: number
    children?: Snippet
  }

  let { class: className, cols, children, ...rest }: Props = $props()

  const ctx = getAutocompleteContext()
  const effectiveCols = $derived(cols ?? (ctx.grid ? 2 : undefined))
</script>

<BitsCombobox.Viewport
  data-slot="autocomplete-list"
  class={cn(
    'flex max-h-(--bits-autocomplete-content-available-height) min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-2',
    effectiveCols && effectiveCols > 1 && 'grid',
    className,
  )}
  style={effectiveCols && effectiveCols > 1 ? `grid-template-columns: repeat(${effectiveCols}, minmax(0, 1fr));` : undefined}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsCombobox.Viewport>
