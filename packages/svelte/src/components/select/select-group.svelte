<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Select as BitsSelect, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'

  export type SelectGroupProps = WithoutChildrenOrChild<BitsSelect.GroupProps> & { children?: Snippet }

  let { children, ...rest }: SelectGroupProps = $props()
</script>

<BitsSelect.Group data-slot="select-group" {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsSelect.Group>
