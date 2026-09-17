<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { NavigationMenu as BitsNavigationMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getNavigationMenuContext, getNavigationMenuInContent } from './navigation-menu-context'

  export type NavigationMenuTriggerProps = WithoutChildrenOrChild<BitsNavigationMenu.TriggerProps> & { children?: Snippet }

  let { class: className, disabled, children, ...rest }: NavigationMenuTriggerProps = $props()

  const ctx = getNavigationMenuContext()
  const inContent = getNavigationMenuInContent()
  const vertical = $derived(inContent || ctx.orientation === 'vertical')
  const classes = $derived(
    cn(
      navigationLinkVariants({ variant: inContent ? 'pill' : ctx.variant, size: ctx.size }),
      vertical && 'w-full',
      'outline-hidden',
      ctx.backdrop && 'z-50',
      className,
    ),
  )
</script>

<BitsNavigationMenu.Trigger
  data-slot="navigation-menu-trigger"
  data-orientation={vertical ? 'vertical' : 'horizontal'}
  {disabled}
  class={classes}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsNavigationMenu.Trigger>
