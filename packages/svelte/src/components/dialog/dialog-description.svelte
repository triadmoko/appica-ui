<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Dialog as BitsDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type DialogDescriptionProps = WithoutChildrenOrChild<BitsDialog.DescriptionProps> & {
    children?: Snippet
  }

  let { class: className, children, ...rest }: DialogDescriptionProps = $props()
</script>

<BitsDialog.Description
  data-slot="dialog-description"
  class={cn('text-foreground-muted text-sm', className)}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsDialog.Description>
