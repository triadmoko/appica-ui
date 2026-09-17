<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Combobox as BitsCombobox, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getComboboxContext } from './combobox-context'

  const GROUP_LABEL_SIZE = {
    sm: 'px-2.5 pt-1.5 pb-1 text-xs',
    md: 'px-3 pt-2 pb-1.25 text-sm',
    lg: 'px-3.5 pt-2.5 pb-1.5 text-base',
  } as const

  export type ComboboxGroupLabelProps = WithoutChildrenOrChild<BitsCombobox.GroupHeadingProps> & { children?: Snippet }

  let { class: className, children, ...rest }: ComboboxGroupLabelProps = $props()

  const ctx = getComboboxContext()
</script>

<BitsCombobox.GroupHeading
  data-slot="combobox-group-label"
  class={cn('text-foreground-subtle', GROUP_LABEL_SIZE[ctx.size], className)}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsCombobox.GroupHeading>
