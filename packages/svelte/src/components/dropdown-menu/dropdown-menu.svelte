<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { DropdownMenu as BitsDropdownMenu } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { commitBindableChange } from '../../internal/utils'
  import {
    setDropdownMenuContext,
    type DropdownMenuHoverConfig,
    type DropdownMenuOrientation,
    type DropdownMenuSize,
  } from './dropdown-menu-context'

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
    size?: DropdownMenuSize
    /**
     * Arrow-key axis for roving focus, and the `data-orientation` stamped on items.
     * @default 'vertical'
     */
    orientation?: DropdownMenuOrientation
    /**
     * Trap focus and block outside scroll/interaction while open.
     * @default true
     */
    modal?: boolean
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
    modal = true,
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

  let hoverConfig = $state<DropdownMenuHoverConfig | null>(null)
  let hoverCount = 0
  let openTimer: ReturnType<typeof setTimeout> | undefined
  let closeTimer: ReturnType<typeof setTimeout> | undefined

  function hoverEnter() {
    if (!hoverConfig?.enabled) return
    hoverCount += 1
    if (closeTimer !== undefined) {
      clearTimeout(closeTimer)
      closeTimer = undefined
    }
    if (innerOpen) return
    const delay = hoverConfig.delay
    if (openTimer !== undefined) clearTimeout(openTimer)
    openTimer = setTimeout(() => {
      handleOpenChange(true)
    }, delay)
  }

  function hoverLeave() {
    if (!hoverConfig?.enabled) return
    hoverCount = Math.max(0, hoverCount - 1)
    if (hoverCount > 0) return
    if (openTimer !== undefined) {
      clearTimeout(openTimer)
      openTimer = undefined
    }
    const wait = Math.max(hoverConfig.closeDelay, 75)
    closeTimer = setTimeout(() => {
      if (hoverCount <= 0) handleOpenChange(false)
    }, wait)
  }

  setDropdownMenuContext({
    get size() {
      return size
    },
    get orientation() {
      return orientation
    },
    get open() {
      return innerOpen
    },
    get disabled() {
      return disabled
    },
    get modal() {
      return modal
    },
    setOpen: handleOpenChange,
    hoverEnter,
    hoverLeave,
    setHoverConfig(config) {
      hoverConfig = config
    },
  })
</script>

<BitsDropdownMenu.Root bind:open={innerOpen} onOpenChange={handleOpenChange} {onOpenChangeComplete} dir={direction.current}>
  {@render children?.()}
</BitsDropdownMenu.Root>
