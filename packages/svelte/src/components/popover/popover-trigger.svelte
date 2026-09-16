<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Popover as BitsPopover } from 'bits-ui'
  import type { OverlayHandle } from '../../internal/overlay-handle.svelte'
  import { asBitsAttrs, cn } from '../../internal/utils'

  type Props = HTMLButtonAttributes & {
    /**
     * Open the popover when the trigger is hovered, not just clicked.
     * @default false
     */
    openOnHover?: boolean
    /**
     * Hover-open delay in ms (with `openOnHover`).
     * @default 300
     */
    delay?: number
    /**
     * Hover-close delay in ms (with `openOnHover`).
     * @default 0
     */
    closeDelay?: number
    /** Detached trigger: pair with `Popover.createHandle()` when rendered outside Root. */
    handle?: OverlayHandle
    children?: Snippet
  }

  let {
    class: className,
    disabled,
    handle,
    openOnHover = false,
    delay = 300,
    closeDelay = 0,
    children,
    ...rest
  }: Props = $props()
</script>

{#if handle}
  <button
    type="button"
    data-slot="popover-trigger"
    {disabled}
    class={cn(className)}
    onclick={() => {
      handle.open = true
    }}
    {...rest}
  >
    {@render children?.()}
  </button>
{:else}
  <BitsPopover.Trigger
    data-slot="popover-trigger"
    {disabled}
    class={cn(className)}
    {openOnHover}
    openDelay={delay}
    {closeDelay}
    {...asBitsAttrs(rest)}
  >
    {@render children?.()}
  </BitsPopover.Trigger>
{/if}
