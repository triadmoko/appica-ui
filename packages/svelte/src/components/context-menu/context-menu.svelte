<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { ContextMenu as BitsContextMenu } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { commitBindableChange } from '../../internal/utils'
  import {
    setContextMenuContext,
    type ContextMenuOrientation,
    type ContextMenuSize,
  } from './context-menu-context'

  type Props = {
    /** Controlled open state. Pair with `onOpenChange` or `bind:open`. */
    open?: boolean
    /**
     * Uncontrolled initial open state.
     * @default false
     */
    defaultOpen?: boolean
    /** Fires when the open state changes. */
    onOpenChange?: (open: boolean) => void
    /** Fires after the open/close transition finishes. */
    onOpenChangeComplete?: (open: boolean) => void
    /**
     * Scales the popup radius, item padding, and icon size.
     * @default 'md'
     */
    size?: ContextMenuSize
    /**
     * Arrow-key axis for roving focus, and the `data-orientation` stamped on items.
     * @default 'vertical'
     */
    orientation?: ContextMenuOrientation
    /**
     * Disable the trigger and prevent opening.
     * @default false
     */
    disabled?: boolean
    children?: Snippet
  }

  let {
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    size = 'md',
    orientation = 'vertical',
    disabled = false,
    children,
  }: Props = $props()

  const direction = useDirection()

  let innerOpen = $state(false)
  innerOpen = untrack(() => open ?? defaultOpen)

  $effect(() => {
    if (open !== undefined) innerOpen = open
  })

  function handleOpenChange(next: boolean) {
    commitBindableChange({
      next,
      bound: open,
      setBound: (value) => {
        open = value
      },
      setInner: (value) => {
        innerOpen = value
      },
      onChange: onOpenChange,
    })
  }

  setContextMenuContext({
    get size() {
      return size
    },
    get orientation() {
      return orientation
    },
    get disabled() {
      return disabled
    },
  })
</script>

<BitsContextMenu.Root bind:open={innerOpen} onOpenChange={handleOpenChange} {onOpenChangeComplete} dir={direction.current}>
  {@render children?.()}
</BitsContextMenu.Root>
