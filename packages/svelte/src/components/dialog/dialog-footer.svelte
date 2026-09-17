<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type DialogFooterProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: DialogFooterProps = $props()
</script>

<div
  data-slot="dialog-footer"
  class={cn('flex flex-col-reverse gap-2 p-6 sm:flex-row sm:justify-end', className)}
  {...rest}
>
  {@render children?.()}
</div>
