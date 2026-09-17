<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: AlertDialogHeaderProps = $props()
</script>

<div data-slot="alert-dialog-header" class={cn('flex shrink-0 flex-col gap-2 p-6', className)} {...rest}>
  {@render children?.()}
</div>
