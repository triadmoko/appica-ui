<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  type Props = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: Props = $props()
</script>

<div
  data-slot="toast-title"
  class={cn('text-foreground-intense flex w-full items-center gap-2 text-sm font-semibold [grid-area:title]', className)}
  {...rest}
>
  {@render children?.()}
</div>
