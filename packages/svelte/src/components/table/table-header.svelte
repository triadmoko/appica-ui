<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement> & { children?: Snippet }
  let { class: className, children, ...rest }: TableHeaderProps = $props()
</script>

<thead data-slot="table-header" class={className} {...rest}>
  {@render children?.()}
</thead>
