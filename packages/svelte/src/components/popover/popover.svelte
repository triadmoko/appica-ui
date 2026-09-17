<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Popover as BitsPopover, type WithoutChildrenOrChild } from 'bits-ui'
  import type { OverlayHandle } from '../../internal/overlay-handle.svelte'
  import { commitBindableChange } from '../../internal/utils'
  import { setPopoverContext, type PopoverModal } from './popover-context'

  export type PopoverProps = WithoutChildrenOrChild<BitsPopover.RootProps> & {
    /**
     * Uncontrolled initial open state.
     * @default false
     */
    defaultOpen?: boolean
    /**
     * Trap focus and block outside scroll/interaction while open.
     * @default false
     */
    modal?: PopoverModal
    /** Programmatic handle from `Popover.createHandle()`. */
    handle?: OverlayHandle
    children?: Snippet
  }

  let {
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    modal = false,
    handle,
    children,
  }: PopoverProps = $props()

  const uid = $props.id()
  let titled = $state(false)
  let described = $state(false)

  setPopoverContext({
    getModal: () => modal,
    titleId: `popover-${uid}-title`,
    descriptionId: `popover-${uid}-description`,
    isTitled: () => titled,
    setTitled: (value) => {
      titled = value
    },
    isDescribed: () => described,
    setDescribed: (value) => {
      described = value
    },
  })

  let innerOpen = $state(false)
  innerOpen = untrack(() => handle?.open ?? open ?? defaultOpen)

  $effect(() => {
    if (handle) innerOpen = handle.open
    else if (open !== undefined) innerOpen = open
  })

  function handleOpenChange(next: boolean) {
    if (handle) {
      handle.open = next
      innerOpen = handle.open
      onOpenChange?.(next)
      return
    }
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
</script>

<BitsPopover.Root bind:open={innerOpen} onOpenChange={handleOpenChange} {onOpenChangeComplete}>
  {@render children?.()}
</BitsPopover.Root>
