<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  type Props = HTMLAttributes<HTMLParagraphElement> & { children?: Snippet }
  let { class: className, children, ...rest }: Props = $props()
</script>

<p
  data-slot="alert-description"
  class={cn(
    'text-foreground text-sm [grid-area:description]',
    'mt-2 @min-[460px]:group-data-[layout=inline]/alert:mt-0',
    className,
  )}
  {...rest}
>
  {@render children?.()}
</p>
