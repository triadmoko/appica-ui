<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Menubar as BitsMenubar } from 'bits-ui'
  import type { ClassValue } from 'clsx'
  import { cn } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getMenubarContext } from './menubar-context'
  import { ITEM_BASE, ITEM_ORIENTATION } from './menubar-variants'

  type Props = HTMLAnchorAttributes & {
    href: string
    /**
     * Close the menu when the item is clicked.
     * @default false
     */
    closeOnClick?: boolean
    disabled?: boolean
    children?: Snippet
  }

  let { class: className, href, closeOnClick = false, disabled, children, ...rest }: Props = $props()

  const ctx = getMenubarContext()
  const classes = $derived(cn(navigationLinkVariants({ variant: 'pill', size: ctx.size }), ITEM_BASE, className))

  function handleSelect(event: Event) {
    if (!closeOnClick) event.preventDefault()
  }
</script>

<BitsMenubar.Item {disabled} onSelect={handleSelect}>
  {#snippet child({ props })}
    <a
      {...props}
      {href}
      data-slot="menubar-link-item"
      data-orientation={ITEM_ORIENTATION}
      class={cn(props.class as ClassValue, classes)}
      {...rest}
    >
      {@render children?.()}
    </a>
  {/snippet}
</BitsMenubar.Item>
