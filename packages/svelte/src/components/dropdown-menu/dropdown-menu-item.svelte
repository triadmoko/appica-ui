<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { DropdownMenu as BitsDropdownMenu } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getDropdownMenuContext } from './dropdown-menu-context'
  import { ITEM_BASE } from './dropdown-menu-variants'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Close the menu after the item is selected.
     * @default true
     */
    closeOnClick?: boolean
    /** When `true`, the item cannot be selected. */
    disabled?: boolean
    children?: Snippet
  }

  let { class: className, closeOnClick = true, disabled, children, ...rest }: Props = $props()

  const ctx = getDropdownMenuContext()
  const classes = $derived(cn(navigationLinkVariants({ variant: 'pill', size: ctx.size }), ITEM_BASE, className))

  function handleSelect(event: Event) {
    if (!closeOnClick) event.preventDefault()
  }
</script>

<BitsDropdownMenu.Item
  data-slot="dropdown-menu-item"
  data-orientation={ctx.orientation}
  {disabled}
  onSelect={handleSelect}
  class={classes}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsDropdownMenu.Item>
