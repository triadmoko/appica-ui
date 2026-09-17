<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  export type PaginationItemProps = HTMLLiAttributes & { children?: Snippet }
  let { class: className, children, ...rest }: PaginationItemProps = $props()
</script>

<li data-slot="pagination-item" class={className} {...rest}>
  {@render children?.()}
</li>
