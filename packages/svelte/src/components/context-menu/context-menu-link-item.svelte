<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { ContextMenu as BitsContextMenu } from 'bits-ui'
  import type { ClassValue } from 'clsx'
  import { cn } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getContextMenuContext } from './context-menu-context'
  import { ITEM_BASE } from './context-menu-variants'

  export type ContextMenuLinkItemProps = HTMLAnchorAttributes & {
    href: string
    /**
     * Close the menu when the item is clicked.
     * @default false
     */
    closeOnClick?: boolean
    disabled?: boolean
    children?: Snippet
  }

  let { class: className, href, closeOnClick = false, disabled, children, ...rest }: ContextMenuLinkItemProps = $props()

  const ctx = getContextMenuContext()
  const classes = $derived(cn(navigationLinkVariants({ variant: 'pill', size: ctx.size }), ITEM_BASE, className))

  function handleSelect(event: Event) {
    if (!closeOnClick) event.preventDefault()
  }
</script>

<BitsContextMenu.Item {disabled} onSelect={handleSelect}>
  {#snippet child({ props })}
    <a
      {...props}
      {href}
      data-slot="context-menu-link-item"
      data-orientation={ctx.orientation}
      class={cn(props.class as ClassValue, classes)}
      {...rest}
    >
      {@render children?.()}
    </a>
  {/snippet}
</BitsContextMenu.Item>
