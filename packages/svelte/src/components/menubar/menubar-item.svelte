<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Menubar as BitsMenubar, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getMenubarContext } from './menubar-context'
  import { ITEM_BASE, ITEM_ORIENTATION } from './menubar-variants'

  export type MenubarItemProps = WithoutChildrenOrChild<BitsMenubar.ItemProps> & {
    /**
     * Close the menu after the item is selected.
     * @default true
     */
    closeOnClick?: boolean
    /** When `true`, the item cannot be selected. */
    disabled?: boolean
    children?: Snippet
  }

  let { class: className, closeOnClick = true, disabled, children, ...rest }: MenubarItemProps = $props()

  const ctx = getMenubarContext()
  const classes = $derived(cn(navigationLinkVariants({ variant: 'pill', size: ctx.size }), ITEM_BASE, className))

  function handleSelect(event: Event) {
    if (!closeOnClick) event.preventDefault()
  }
</script>

<BitsMenubar.Item
  data-slot="menubar-item"
  data-orientation={ITEM_ORIENTATION}
  {disabled}
  onSelect={handleSelect}
  class={classes}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsMenubar.Item>
