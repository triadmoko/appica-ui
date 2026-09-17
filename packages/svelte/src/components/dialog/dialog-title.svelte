<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Dialog as BitsDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type DialogTitleProps = WithoutChildrenOrChild<BitsDialog.TitleProps> & { children?: Snippet }

  let { class: className, children, ...rest }: DialogTitleProps = $props()
</script>

<BitsDialog.Title
  data-slot="dialog-title"
  class={cn('text-foreground-intense text-2xl font-semibold', className)}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsDialog.Title>
