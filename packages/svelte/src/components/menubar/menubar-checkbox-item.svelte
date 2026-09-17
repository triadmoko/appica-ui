<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Menubar as BitsMenubar, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn, commitBindableChange } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getMenubarContext } from './menubar-context'
  import { CHECK_PATH_CLASS, ITEM_BASE, ITEM_ORIENTATION, ITEM_TEXT } from './menubar-variants'

  export type MenubarCheckboxItemProps = WithoutChildrenOrChild<BitsMenubar.CheckboxItemProps> & {
    /** Controlled checked state. Pair with `onCheckedChange` or `bind:checked`. */
    checked?: boolean
    /** Fires when the checked state changes. */
    onCheckedChange?: (checked: boolean) => void
    /** Value used inside a `MenubarCheckboxGroup`. */
    value?: string
    /**
     * Close the menu when toggled.
     * @default false
     */
    closeOnClick?: boolean
    disabled?: boolean
    children?: Snippet
  }

  let {
    class: className,
    checked = $bindable(),
    onCheckedChange,
    value,
    closeOnClick = false,
    disabled,
    children: label,
    ...rest
  }: MenubarCheckboxItemProps = $props()

  const ctx = getMenubarContext()
  let inner = $state(false)
  inner = untrack(() => checked ?? false)

  $effect(() => {
    if (checked !== undefined) inner = checked
  })

  function handleCheckedChange(next: boolean) {
    commitBindableChange({
      next,
      bound: checked,
      setBound: (nextValue) => {
        checked = nextValue
      },
      setInner: (nextValue) => {
        inner = nextValue
      },
      onChange: onCheckedChange,
    })
  }

  const classes = $derived(
    cn(navigationLinkVariants({ variant: 'pill', size: ctx.size }), ITEM_BASE, 'justify-between', className),
  )
</script>

<BitsMenubar.CheckboxItem
  data-slot="menubar-checkbox-item"
  data-orientation={ITEM_ORIENTATION}
  bind:checked={inner}
  {value}
  {disabled}
  closeOnSelect={closeOnClick}
  onCheckedChange={handleCheckedChange}
  class={classes}
  {...asBitsAttrs(rest)}
>
  {#snippet children({ checked: isChecked })}
    <span class={cn('flex items-center', ITEM_TEXT[ctx.size])}>{@render label?.()}</span>
    <span
      data-slot="menubar-checkbox-item-indicator"
      class="group/check text-foreground-intense shrink-0"
      data-checked={isChecked ? '' : undefined}
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
</BitsMenubar.CheckboxItem>
