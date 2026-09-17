<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  export type CarouselContentProps = HTMLAttributes<HTMLDivElement> & {
    /** Props for the scroll viewport, the element that clips the track. */
    viewportProps?: HTMLAttributes<HTMLDivElement>
    children?: Snippet
  }
</script>

<script lang="ts">
  import { untrack } from 'svelte'
  import { on } from 'svelte/events'
  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import type { CarouselApi } from './carousel-types'
  import { cn } from '../../internal/utils'
  import { useCarousel } from './carousel-context'

  let { class: className, viewportProps, children, ...rest }: CarouselContentProps = $props()

  const ctx = useCarousel()
  const viewportClass = $derived(viewportProps?.class)
  const viewportRest = $derived.by(() => {
    if (!viewportProps) return {}
    const { class: _className, ...restProps } = viewportProps
    return restProps
  })

  function onEmblaInit(event: Event) {
    ctx.setApi((event as CustomEvent<CarouselApi>).detail)
  }

  function attachEmbla(node: HTMLElement) {
    const getConfig = () => ({ options: ctx.options, plugins: ctx.plugins })
    const offEmblaInit = on(node, 'emblainit', onEmblaInit)
    const inst = emblaCarouselSvelte(node, untrack(getConfig))
    let primed = false
    $effect(() => {
      const config = getConfig()
      if (!primed) {
        primed = true
        return
      }
      inst.update?.(config)
    })
    return () => {
      offEmblaInit()
      inst.destroy?.()
    }
  }
</script>

<div
  {@attach attachEmbla}
  data-slot="carousel-viewport"
  data-orientation={ctx.orientation}
  data-auto-height={ctx.autoHeight || undefined}
  class={cn(
    'overflow-hidden',
    ctx.autoHeight && 'motion-safe:transition-[height] motion-safe:duration-300 motion-safe:ease-out',
    viewportClass,
  )}
  {...viewportRest}
>
  <div
    data-slot="carousel-content"
    data-orientation={ctx.orientation}
    class={cn(
      'flex',
      ctx.orientation === 'horizontal'
        ? '-ms-4 touch-pan-y touch-pinch-zoom items-start'
        : '-mt-4 h-full touch-pan-x touch-pinch-zoom flex-col',
      className,
    )}
    {...rest}
  >
    {@render children?.()}
  </div>
</div>
