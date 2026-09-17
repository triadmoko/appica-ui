<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type DialogHeaderProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: DialogHeaderProps = $props()
</script>

<div data-slot="dialog-header" class={cn('flex shrink-0 flex-col gap-2 p-6', className)} {...rest}>
  {@render children?.()}
</div>
