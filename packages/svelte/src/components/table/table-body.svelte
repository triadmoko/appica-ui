<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement> & { children?: Snippet }
  let { class: className, children, ...rest }: TableBodyProps = $props()
</script>

<tbody data-slot="table-body" class={className} {...rest}>
  {@render children?.()}
</tbody>
