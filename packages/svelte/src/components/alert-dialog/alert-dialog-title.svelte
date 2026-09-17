<script lang="ts">
  import type { Snippet } from 'svelte'
  import { AlertDialog as BitsAlertDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type AlertDialogTitleProps = WithoutChildrenOrChild<BitsAlertDialog.TitleProps> & {
    children?: Snippet
  }

  let { class: className, children, ...rest }: AlertDialogTitleProps = $props()
</script>

<BitsAlertDialog.Title
  data-slot="alert-dialog-title"
  class={cn('text-foreground-intense text-xl font-semibold', className)}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsAlertDialog.Title>
