<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type DrawerFooterProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: DrawerFooterProps = $props()
</script>

<div data-slot="drawer-footer" class={cn('flex flex-col gap-2 p-6', className)} {...rest}>
  {@render children?.()}
</div>
