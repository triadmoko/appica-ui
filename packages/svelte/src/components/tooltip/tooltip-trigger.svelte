<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Tooltip as BitsTooltip } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getTooltipContext } from './tooltip-context'

  type Props = HTMLButtonAttributes & {
    children?: Snippet
  }

  let {
    class: className,
    disabled,
    onmousemove,
    onmouseenter,
    children,
    ...rest
  }: Props = $props()

  const ctx = getTooltipContext()

  function attachTrigger(node: HTMLButtonElement) {
    ctx?.setTriggerEl(node)
    return () => ctx?.setTriggerEl(null)
  }

  function handleMouseMove(event: MouseEvent) {
    ctx?.onPointerMove(event)
    onmousemove?.(event)
  }

  function handleMouseEnter(event: MouseEvent) {
    ctx?.onPointerMove(event)
    onmouseenter?.(event)
  }
</script>

<BitsTooltip.Trigger
  {@attach attachTrigger}
  data-slot="tooltip-trigger"
  {disabled}
  class={cn(className)}
  onmousemove={handleMouseMove}
  onmouseenter={handleMouseEnter}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsTooltip.Trigger>
