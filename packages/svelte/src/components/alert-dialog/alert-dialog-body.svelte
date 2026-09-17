<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type AlertDialogBodyProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: AlertDialogBodyProps = $props()
</script>

<div data-slot="alert-dialog-body" class={cn('min-h-0 flex-1 px-6', className)} {...rest}>
  {@render children?.()}
</div>
