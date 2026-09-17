<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { ContextMenu as BitsContextMenu } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getContextMenuContext } from './context-menu-context'
  import { ITEM_BASE } from './context-menu-variants'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Close the menu after the item is selected.
     * @default true
     */
    closeOnClick?: boolean
    disabled?: boolean
    children?: Snippet
  }

  let { class: className, closeOnClick = true, disabled, children, ...rest }: Props = $props()

  const ctx = getContextMenuContext()
  const classes = $derived(cn(navigationLinkVariants({ variant: 'pill', size: ctx.size }), ITEM_BASE, className))

  function handleSelect(event: Event) {
    if (!closeOnClick) event.preventDefault()
  }
</script>

<BitsContextMenu.Item
  data-slot="context-menu-item"
  data-orientation={ctx.orientation}
  {disabled}
  onSelect={handleSelect}
  class={classes}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsContextMenu.Item>
