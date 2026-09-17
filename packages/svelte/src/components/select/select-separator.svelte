<script lang="ts">
  import { type SelectSeparatorProps as BitsSelectSeparatorProps, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type SelectSeparatorProps = WithoutChildrenOrChild<BitsSelectSeparatorProps>

  let { class: className, ...rest }: SelectSeparatorProps = $props()
</script>

<div
  data-slot="select-separator"
  role="separator"
  class={cn('bg-border -mx-2 my-1.5 h-px shrink-0', className)}
  {...asBitsAttrs(rest)}
></div>
