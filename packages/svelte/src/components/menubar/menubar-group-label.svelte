<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Menubar as BitsMenubar, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getMenubarContext } from './menubar-context'
  import { GROUP_LABEL_SIZE } from './menubar-variants'

  export type MenubarGroupLabelProps = WithoutChildrenOrChild<BitsMenubar.GroupHeadingProps> & { children?: Snippet }

  let { class: className, children, ...rest }: MenubarGroupLabelProps = $props()

  const ctx = getMenubarContext()
</script>

<BitsMenubar.GroupHeading
  data-slot="menubar-group-label"
  class={cn('text-foreground-subtle', GROUP_LABEL_SIZE[ctx.size], className)}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsMenubar.GroupHeading>
