<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Dialog as BitsDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type DialogCloseProps = WithoutChildrenOrChild<BitsDialog.CloseProps> & { children?: Snippet }

  let { class: className, children, ...rest }: DialogCloseProps = $props()
</script>

<BitsDialog.Close data-slot="dialog-close" class={cn(className)} {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsDialog.Close>
