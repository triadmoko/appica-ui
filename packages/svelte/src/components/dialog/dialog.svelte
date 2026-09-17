<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Dialog as BitsDialog } from 'bits-ui'
  import type { OverlayHandle } from '../../internal/overlay-handle.svelte'
  import { commitBindableChange } from '../../internal/utils'
  import { setDialogContext, type DialogModal } from './dialog-context'

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
     * Trap focus and block scroll/interaction with the page behind.
     * @default true
     */
    modal?: DialogModal
    /**
     * Keep the dialog open when the backdrop is clicked.
     * @default false
     */
    disablePointerDismissal?: boolean
    /** Programmatic handle from `Dialog.createHandle()`. */
    handle?: OverlayHandle
    children?: Snippet
  }

  let {
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    modal = true,
    disablePointerDismissal = false,
    handle,
    children,
  }: Props = $props()

  setDialogContext({
    getModal: () => modal,
    getDisablePointerDismissal: () => disablePointerDismissal,
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

<BitsDialog.Root bind:open={innerOpen} onOpenChange={handleOpenChange} {onOpenChangeComplete}>
  {@render children?.()}
</BitsDialog.Root>
