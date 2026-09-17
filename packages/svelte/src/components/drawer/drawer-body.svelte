<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type DrawerBodyProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: DrawerBodyProps = $props()
</script>

<div data-slot="drawer-body" class={cn('min-h-0 flex-1 overflow-y-auto px-6', className)} {...rest}>
  {@render children?.()}
</div>
