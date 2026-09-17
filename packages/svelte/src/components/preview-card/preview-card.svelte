<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { LinkPreview as BitsLinkPreview, type WithoutChildrenOrChild } from 'bits-ui'
  import type { OverlayHandle } from '../../internal/overlay-handle.svelte'
  import { commitBindableChange } from '../../internal/utils'

  export type PreviewCardProps = WithoutChildrenOrChild<BitsLinkPreview.RootProps> & {
    /** Programmatic handle from `PreviewCard.createHandle()`. */
    handle?: OverlayHandle
    children?: Snippet
  }

  let {
    open = $bindable(),
    onOpenChange,
    handle,
    openDelay = 600,
    closeDelay = 300,
    disabled,
    children,
  }: PreviewCardProps = $props()

  let innerOpen = $state(false)
  innerOpen = untrack(() => handle?.open ?? open ?? false)

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

<BitsLinkPreview.Root
  bind:open={innerOpen}
  onOpenChange={handleOpenChange}
  {openDelay}
  {closeDelay}
  {disabled}
>
  {@render children?.()}
</BitsLinkPreview.Root>
