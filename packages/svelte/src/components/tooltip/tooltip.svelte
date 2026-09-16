<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Tooltip as BitsTooltip } from 'bits-ui'
  import { commitBindableChange } from '../../internal/utils'
  import { setTooltipContext, type TrackCursorAxis } from './tooltip-context'

  type Props = {
    /** Controlled open state. Pair with `onOpenChange` or `bind:open`. */
    open?: boolean
    /** Fires when the open state changes. */
    onOpenChange?: (open: boolean) => void
    /**
     * Delay in milliseconds before this tooltip opens. Overrides the provider delay.
     */
    delay?: number
    /**
     * Prevent the tooltip from opening.
     * @default false
     */
    disabled?: boolean
    /**
     * Close the tooltip when the pointer enters its content.
     * @default false
     */
    disableHoverablePopup?: boolean
    /**
     * Make the bubble follow the cursor along the given axis.
     * @default 'none'
     */
    trackCursorAxis?: TrackCursorAxis
    children?: Snippet
  }

  let {
    open = $bindable(),
    onOpenChange,
    delay,
    disabled = false,
    disableHoverablePopup = false,
    trackCursorAxis = 'none',
    children,
  }: Props = $props()

  let innerOpen = $state(false)
  innerOpen = untrack(() => open ?? false)

  let triggerEl = $state<HTMLElement | null>(null)
  const cursor = $state({ x: 0, y: 0 })

  $effect(() => {
    if (open !== undefined) innerOpen = open
  })

  $effect(() => {
    if (!innerOpen || trackCursorAxis === 'none') return

    function handleMouseMove(event: MouseEvent) {
      cursor.x = event.clientX
      cursor.y = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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

  function onPointerMove(event: MouseEvent) {
    if (trackCursorAxis === 'none') return
    cursor.x = event.clientX
    cursor.y = event.clientY
  }

  setTooltipContext({
    getTrackCursorAxis: () => trackCursorAxis,
    get cursor() {
      return cursor
    },
    getTriggerEl: () => triggerEl,
    setTriggerEl: (el) => {
      triggerEl = el
    },
    onPointerMove,
  })
</script>

<BitsTooltip.Root
  bind:open={innerOpen}
  onOpenChange={handleOpenChange}
  delayDuration={delay}
  {disabled}
  disableHoverableContent={disableHoverablePopup}
>
  {@render children?.()}
</BitsTooltip.Root>
