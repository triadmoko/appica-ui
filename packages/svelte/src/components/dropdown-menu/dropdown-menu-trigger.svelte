<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { DropdownMenu as BitsDropdownMenu } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getDropdownMenuContext } from './dropdown-menu-context'

  type Props = HTMLButtonAttributes & {
    /**
     * Open the menu when the trigger is hovered, not just clicked.
     * @default false
     */
    openOnHover?: boolean
    /**
     * Hover-open delay in ms (with `openOnHover`).
     * @default 100
     */
    delay?: number
    /**
     * Hover-close delay in ms (with `openOnHover`).
     * @default 0
     */
    closeDelay?: number
    children?: Snippet
  }

  let {
    class: className,
    disabled,
    openOnHover = false,
    delay = 100,
    closeDelay = 0,
    onpointerenter,
    onpointerleave,
    children,
    ...rest
  }: Props = $props()

  const ctx = getDropdownMenuContext()
  const isDisabled = $derived(disabled || ctx.disabled)

  $effect(() => {
    ctx.setHoverConfig(openOnHover ? { enabled: true, delay, closeDelay } : null)
    return () => ctx.setHoverConfig(null)
  })

  function handlePointerEnter(event: PointerEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    onpointerenter?.(event)
    ctx.hoverEnter()
  }

  function handlePointerLeave(event: PointerEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    onpointerleave?.(event)
    ctx.hoverLeave()
  }
</script>

<BitsDropdownMenu.Trigger
  data-slot="dropdown-menu-trigger"
  data-popup-open={ctx.open ? '' : undefined}
  disabled={isDisabled}
  class={cn(className)}
  onpointerenter={handlePointerEnter}
  onpointerleave={handlePointerLeave}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsDropdownMenu.Trigger>
