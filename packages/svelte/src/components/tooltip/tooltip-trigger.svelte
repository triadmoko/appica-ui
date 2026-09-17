<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Tooltip as BitsTooltip, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { tryGetToolbarContext } from '../toolbar/toolbar-context.svelte'
  import { getTooltipContext } from './tooltip-context'

  export type TooltipTriggerProps = WithoutChildrenOrChild<BitsTooltip.TriggerProps> & {
    children?: Snippet
  }

  let {
    class: className,
    disabled,
    onmousemove,
    onmouseenter,
    onfocus,
    children,
    ...rest
  }: TooltipTriggerProps = $props()

  const ctx = getTooltipContext()
  const toolbar = tryGetToolbarContext()
  let node = $state<HTMLButtonElement | undefined>()
  const isDisabled = $derived(Boolean(disabled || toolbar?.disabled))
  const tabIndex = $derived(toolbar && node && toolbar.isTabStop(node) ? 0 : -1)

  function attachTrigger(el: HTMLButtonElement) {
    node = el
    ctx?.setTriggerEl(el)
    const unregisterToolbar = toolbar?.register({ el, disabled: () => isDisabled })
    return () => {
      ctx?.setTriggerEl(null)
      unregisterToolbar?.()
    }
  }

  function handleMouseMove(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    ctx?.onPointerMove(event)
    onmousemove?.(event)
  }

  function handleMouseEnter(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    ctx?.onPointerMove(event)
    onmouseenter?.(event)
  }

  function handleFocus(event: FocusEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    if (node && toolbar) toolbar.tabStop = node
    onfocus?.(event)
  }
</script>

<BitsTooltip.Trigger
  {@attach attachTrigger}
  data-slot="tooltip-trigger"
  class={cn(className)}
  {...asBitsAttrs(rest)}
  disabled={toolbar ? isDisabled : disabled}
  data-disabled={toolbar && isDisabled ? '' : undefined}
  tabindex={toolbar ? tabIndex : undefined}
  onmousemove={handleMouseMove}
  onmouseenter={handleMouseEnter}
  onfocus={handleFocus}
>
  {@render children?.()}
</BitsTooltip.Trigger>
