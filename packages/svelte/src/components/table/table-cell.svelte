<script lang="ts">
  import type { HTMLTdAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  export type TableCellProps = HTMLTdAttributes & { children?: Snippet }
  let { class: className, children, ...rest }: TableCellProps = $props()
</script>

<td data-slot="table-cell" class={className} {...rest}>
  {@render children?.()}
</td>
