<script lang="ts" module>
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import type { CarouselNavPosition } from './carousel-types'

  export type CarouselNextProps = HTMLButtonAttributes & {
    /**
     * Where the control sits relative to the viewport.
     * @default 'inside'
     */
    position?: CarouselNavPosition
    /** Props forwarded to the inner `<button>`. `class` merges onto the trigger. */
    buttonProps?: HTMLButtonAttributes
    children?: Snippet
  }
</script>

<script lang="ts">
  import { cn } from '../../internal/utils'
  import { useCarousel } from './carousel-context'
  import { NEXT_POSITION_CLASSES } from './carousel-tokens'

  let {
    class: className,
    position = 'inside',
    disabled: disabledProp,
    buttonProps,
    children,
    onclick,
    ...rest
  }: CarouselNextProps = $props()

  const ctx = useCarousel()
  const disabled = $derived(Boolean(disabledProp) || !ctx.canScrollNext)
  const buttonClass = $derived(buttonProps?.class)
  const buttonRest = $derived.by(() => {
    if (!buttonProps) return {}
    const { class: _className, onclick: _onclick, disabled: _disabled, ...restProps } = buttonProps
    return restProps
  })
</script>

<div
  data-slot="carousel-next-positioner"
  data-orientation={ctx.orientation}
  class={cn(NEXT_POSITION_CLASSES[position], className)}
>
  <button
    type="button"
    data-slot="carousel-next"
    data-disabled={disabled || undefined}
    aria-label="Next slide"
    {disabled}
    {...buttonRest}
    {...rest}
    class={cn(buttonClass)}
    onclick={(event) => {
      buttonProps?.onclick?.(event)
      onclick?.(event)
      if (!event.defaultPrevented) ctx.scrollNext()
    }}
  >
    {@render children?.()}
  </button>
</div>
