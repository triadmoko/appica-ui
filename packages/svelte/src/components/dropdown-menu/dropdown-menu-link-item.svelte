<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { DropdownMenu as BitsDropdownMenu } from 'bits-ui'
  import type { ClassValue } from 'clsx'
  import { cn } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getDropdownMenuContext } from './dropdown-menu-context'
  import { ITEM_BASE } from './dropdown-menu-variants'

  type Props = HTMLAnchorAttributes & {
    href: string
    /**
     * Close the menu when the item is clicked.
     * @default true
     */
    closeOnClick?: boolean
    disabled?: boolean
    children?: Snippet
  }

  let { class: className, href, closeOnClick = true, disabled, children, ...rest }: Props = $props()

  const ctx = getDropdownMenuContext()
  const classes = $derived(cn(navigationLinkVariants({ variant: 'pill', size: ctx.size }), ITEM_BASE, className))

  function handleSelect(event: Event) {
    if (!closeOnClick) event.preventDefault()
  }
</script>

<BitsDropdownMenu.Item {disabled} onSelect={handleSelect}>
  {#snippet child({ props })}
    <a
      {...props}
      {href}
      data-slot="dropdown-menu-link-item"
      data-orientation={ctx.orientation}
      class={cn(props.class as ClassValue, classes)}
      {...rest}
    >
      {@render children?.()}
    </a>
  {/snippet}
</BitsDropdownMenu.Item>
