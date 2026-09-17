<script lang="ts">
  import type { HTMLThAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type TableHeadProps = HTMLThAttributes & { children?: Snippet }
  let { class: className, children, ...rest }: TableHeadProps = $props()
</script>

<th data-slot="table-head" class={cn('text-start', className)} {...rest}>
  {@render children?.()}
</th>
