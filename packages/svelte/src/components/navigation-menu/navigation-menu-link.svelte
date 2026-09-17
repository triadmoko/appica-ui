<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { NavigationMenu as BitsNavigationMenu } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getNavigationMenuContext, getNavigationMenuInContent } from './navigation-menu-context'

  type Props = HTMLAnchorAttributes & {
    /** Marks this link as the current page. */
    active?: boolean
    /**
     * Close the navigation menu when the link is clicked.
     * @default false
     */
    closeOnClick?: boolean
    children?: Snippet
  }

  let { class: className, href, active, closeOnClick = false, children, ...rest }: Props = $props()

  const ctx = getNavigationMenuContext()
  const inContent = getNavigationMenuInContent()
  const vertical = $derived(inContent || ctx.orientation === 'vertical')
  const classes = $derived(
    cn(
      navigationLinkVariants({ variant: inContent ? 'pill' : ctx.variant, size: ctx.size }),
      vertical && 'w-full',
      'outline-hidden',
      className,
    ),
  )

  function handleSelect(event: Event) {
    if (!closeOnClick) event.preventDefault()
  }
</script>

<BitsNavigationMenu.Link
  data-slot="navigation-menu-link"
  data-orientation={vertical ? 'vertical' : 'horizontal'}
  {href}
  {active}
  onSelect={handleSelect}
  class={classes}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsNavigationMenu.Link>
