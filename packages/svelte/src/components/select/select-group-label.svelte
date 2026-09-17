<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Select as BitsSelect, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getSelectContext } from './select-context'

  const GROUP_LABEL_SIZE = {
    sm: 'px-2.5 pt-1.5 pb-1 text-xs',
    md: 'px-3 pt-2 pb-1.25 text-sm',
    lg: 'px-3.5 pt-2.5 pb-1.5 text-base',
  } as const

  export type SelectGroupLabelProps = WithoutChildrenOrChild<BitsSelect.GroupHeadingProps> & {
    children?: Snippet
  }

  let { class: className, children, ...rest }: SelectGroupLabelProps = $props()

  const ctx = getSelectContext()
</script>

<BitsSelect.GroupHeading
  data-slot="select-group-label"
  class={cn('text-foreground-subtle', GROUP_LABEL_SIZE[ctx.size], className)}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsSelect.GroupHeading>
