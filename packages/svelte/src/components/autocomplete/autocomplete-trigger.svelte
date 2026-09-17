<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Combobox as BitsCombobox, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type AutocompleteTriggerProps = WithoutChildrenOrChild<BitsCombobox.TriggerProps> & { children?: Snippet }

  let { class: className, children, ...rest }: AutocompleteTriggerProps = $props()
</script>

<BitsCombobox.Trigger
  data-slot="autocomplete-trigger"
  class={cn(
    'cursor-pointer outline-none',
    'data-disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:cursor-not-allowed',
    className,
  )}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsCombobox.Trigger>
