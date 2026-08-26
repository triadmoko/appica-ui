<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  type Props = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: Props = $props()
</script>

<div data-slot="toast-description" class={cn('text-foreground text-sm [grid-area:description]', className)} {...rest}>
  {@render children?.()}
</div>
