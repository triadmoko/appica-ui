<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type PaginationListProps = HTMLAttributes<HTMLUListElement> & { children?: Snippet }
  let { class: className, children, ...rest }: PaginationListProps = $props()
</script>

<ul data-slot="pagination-list" class={cn('flex items-center gap-1', className)} {...rest}>
  {@render children?.()}
</ul>
