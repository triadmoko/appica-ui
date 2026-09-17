<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: AlertDialogFooterProps = $props()
</script>

<div
  data-slot="alert-dialog-footer"
  class={cn('flex flex-col-reverse gap-2 p-6 sm:flex-row sm:justify-end', className)}
  {...rest}
>
  {@render children?.()}
</div>
