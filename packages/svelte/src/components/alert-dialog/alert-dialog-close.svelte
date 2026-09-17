<script lang="ts">
  import type { Snippet } from 'svelte'
  import { AlertDialog as BitsAlertDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type AlertDialogCloseProps = WithoutChildrenOrChild<BitsAlertDialog.CancelProps> & {
    children?: Snippet
  }

  let { class: className, children, ...rest }: AlertDialogCloseProps = $props()
</script>

<BitsAlertDialog.Cancel data-slot="alert-dialog-close" class={cn(className)} {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsAlertDialog.Cancel>
