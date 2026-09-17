<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Select as BitsSelect, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type SelectValueFormat = {
    /** First selected label, or undefined when empty. */
    label: string | undefined
    /** Every selected label. */
    labels: string[]
    placeholder: string | undefined
  }

  export type SelectValueProps = WithoutChildrenOrChild<BitsSelect.ValueProps> & {
    /** Format the closed trigger. Receives the selected label(s). */
    children?: Snippet<[SelectValueFormat]>
  }

  let { class: className, placeholder, children: format, ...rest }: SelectValueProps = $props()
</script>

<BitsSelect.Value data-slot="select-value" {placeholder} class={cn('min-w-0 flex-1 truncate text-start', className)} {...asBitsAttrs(rest)}>
  {#snippet children({ selection, placeholder: ph })}
    {@const labels =
      selection.type === 'multiple'
        ? selection.selected.map((item) => item.label)
        : selection.selected?.label
          ? [selection.selected.label]
          : []}
    {#if format}
      {@render format({ label: labels[0], labels, placeholder: ph ?? undefined })}
    {:else if labels.length > 0}
      {labels.join(', ')}
    {:else}
      {ph}
    {/if}
  {/snippet}
</BitsSelect.Value>
