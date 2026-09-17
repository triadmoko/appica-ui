<script lang="ts">
  import type { Snippet } from 'svelte'
  import { AlertDialog as BitsAlertDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type AlertDialogDescriptionProps = WithoutChildrenOrChild<BitsAlertDialog.DescriptionProps> & {
    children?: Snippet
  }

  let { class: className, children, ...rest }: AlertDialogDescriptionProps = $props()
</script>

<BitsAlertDialog.Description
  data-slot="alert-dialog-description"
  class={cn('text-foreground-muted text-sm', className)}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsAlertDialog.Description>
