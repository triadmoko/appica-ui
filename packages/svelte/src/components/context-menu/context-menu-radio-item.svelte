<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { ContextMenu as BitsContextMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getContextMenuContext } from './context-menu-context'
  import { CHECK_PATH_CLASS, ITEM_BASE, ITEM_TEXT } from './context-menu-variants'

  export type ContextMenuRadioItemProps = WithoutChildrenOrChild<BitsContextMenu.RadioItemProps> & {
    /** Value of this radio option. */
    value: string
    /**
     * Close the menu when chosen.
     * @default false
     */
    closeOnClick?: boolean
    disabled?: boolean
    children?: Snippet
  }

  let { class: className, value, closeOnClick = false, disabled, children: label, ...rest }: ContextMenuRadioItemProps = $props()

  const ctx = getContextMenuContext()
  const classes = $derived(
    cn(navigationLinkVariants({ variant: 'pill', size: ctx.size }), ITEM_BASE, 'justify-between', className),
  )
</script>

<BitsContextMenu.RadioItem
  data-slot="context-menu-radio-item"
  data-orientation={ctx.orientation}
  {value}
  {disabled}
  closeOnSelect={closeOnClick}
  class={classes}
  {...asBitsAttrs(rest)}
>
  {#snippet children({ checked })}
    <span class={cn('flex items-center', ITEM_TEXT[ctx.size])}>{@render label?.()}</span>
    <span
      data-slot="context-menu-radio-item-indicator"
      class="group/check text-foreground-intense shrink-0"
      data-checked={checked ? '' : undefined}
    >
      <svg
        data-icon="end"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class="me-0.5 size-[1.125em] stroke-2"
      >
        <path d="M4.3 12.55 L9.25 17.5 L19.7 6.5" pathLength={1} stroke-dasharray="1 2" class={CHECK_PATH_CLASS} />
      </svg>
    </span>
  {/snippet}
</BitsContextMenu.RadioItem>
