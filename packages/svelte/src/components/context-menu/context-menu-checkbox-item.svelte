<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { ContextMenu as BitsContextMenu } from 'bits-ui'
  import { asBitsAttrs, cn, commitBindableChange } from '../../internal/utils'
  import { navigationLinkVariants } from '../navigation/navigation-link-variants'
  import { getContextMenuContext } from './context-menu-context'
  import { CHECK_PATH_CLASS, ITEM_BASE, ITEM_TEXT } from './context-menu-variants'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /** Controlled checked state. Pair with `onCheckedChange` or `bind:checked`. */
    checked?: boolean
    /** Fires when the checked state changes. */
    onCheckedChange?: (checked: boolean) => void
    /** Value used inside a `ContextMenuCheckboxGroup`. */
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
  }: Props = $props()

  const ctx = getContextMenuContext()
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

<BitsContextMenu.CheckboxItem
  data-slot="context-menu-checkbox-item"
  data-orientation={ctx.orientation}
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
      data-slot="context-menu-checkbox-item-indicator"
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
</BitsContextMenu.CheckboxItem>
