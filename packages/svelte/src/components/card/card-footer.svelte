<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type CardFooterProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }
  let { class: className, children, ...rest }: CardFooterProps = $props()
</script>

<div
  data-slot="card-footer"
  class={cn(
    'flex flex-col-reverse gap-2 px-6 pb-6 sm:flex-row sm:items-center',
    'group-data-inset/card:px-4 group-data-inset/card:pb-4',
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
