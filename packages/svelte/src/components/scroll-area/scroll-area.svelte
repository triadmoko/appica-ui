<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { cn } from '../../internal/utils'
  import { useDirection } from '../../hooks/use-direction/use-direction'

  type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both'
  type ScrollbarVisibility = 'always' | 'auto' | 'never'
  type RtlScrollType = 'negative' | 'positive'

  const SCROLL_SHADOW_CLASSES = cn(
    'mask-no-repeat mask-intersect',
    'ltr:[mask-image:linear-gradient(to_bottom,transparent_0,black_min(40px,var(--scroll-area-overflow-y-start)),black_calc(100%_-_min(40px,var(--scroll-area-overflow-y-end,40px))),transparent_100%),linear-gradient(to_right,transparent_0,black_min(40px,var(--scroll-area-overflow-x-start)),black_calc(100%_-_min(40px,var(--scroll-area-overflow-x-end,40px))),transparent_100%)]',
    'rtl:[mask-image:linear-gradient(to_bottom,transparent_0,black_min(40px,var(--scroll-area-overflow-y-start)),black_calc(100%_-_min(40px,var(--scroll-area-overflow-y-end,40px))),transparent_100%),linear-gradient(to_left,transparent_0,black_min(40px,var(--scroll-area-overflow-x-start)),black_calc(100%_-_min(40px,var(--scroll-area-overflow-x-end,40px))),transparent_100%)]',
  )

  const SCROLLBAR_AUTO_CLASSES = cn(
    'pointer-events-none opacity-0',
    'data-[hovering]:pointer-events-auto data-[hovering]:opacity-100',
    'data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0',
  )

  const SCROLLBAR_CLASSES = cn(
    'absolute z-1 m-0.5 flex touch-none select-none',
    'transition-[width,height,opacity] duration-150 ease-out motion-reduce:transition-none',
    'data-[orientation=vertical]:inset-y-0 data-[orientation=vertical]:inset-e-0 data-[orientation=vertical]:w-1.25 data-[orientation=vertical]:justify-center',
    'data-[orientation=horizontal]:inset-x-0 data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:h-1.25 data-[orientation=horizontal]:items-center',
    'data-[orientation=vertical]:hover:w-2',
    'data-[orientation=horizontal]:hover:h-2',
  )

  let rtlScrollType: RtlScrollType | undefined

  function detectRtlScrollType(): RtlScrollType {
    if (rtlScrollType) return rtlScrollType
    if (typeof document === 'undefined') {
      rtlScrollType = 'negative'
      return rtlScrollType
    }
    const dummy = document.createElement('div')
    dummy.setAttribute('dir', 'rtl')
    dummy.style.cssText =
      'width:100px;height:100px;overflow:auto;position:absolute;left:-9999px;top:0;visibility:hidden'
    dummy.appendChild(document.createElement('div')).style.cssText = 'width:200px;height:200px'
    document.body.appendChild(dummy)
    void dummy.offsetWidth
    if (dummy.scrollLeft > 0) {
      rtlScrollType = 'positive'
    } else {
      dummy.scrollLeft = dummy.clientWidth - dummy.scrollWidth
      rtlScrollType = dummy.scrollLeft < 0 ? 'negative' : 'positive'
    }
    dummy.remove()
    return rtlScrollType
  }

  function overflowXEdges(node: HTMLElement, rtl: boolean) {
    const max = Math.max(0, node.scrollWidth - node.clientWidth)
    const scrollLeft = node.scrollLeft
    if (!rtl || max === 0) {
      return { start: Math.max(0, scrollLeft), end: Math.max(0, max - scrollLeft) }
    }
    if (detectRtlScrollType() === 'negative' || scrollLeft < 0) {
      return { start: Math.max(0, -scrollLeft), end: Math.max(0, max + scrollLeft) }
    }
    return { start: Math.max(0, max - scrollLeft), end: Math.max(0, scrollLeft) }
  }

  function scrollLeftFromStart(offset: number, max: number, rtl: boolean) {
    if (!rtl) return offset
    return detectRtlScrollType() === 'negative' ? -offset : max - offset
  }

  function applyThreshold(value: number, threshold: number) {
    return value > threshold ? value : 0
  }

  export type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Which axis (or axes) gets a scrollbar. `both` also renders the corner.
     * @default 'vertical'
     */
    orientation?: ScrollAreaOrientation
    /**
     * Fade the content at scrollable edges via a CSS mask.
     * @default false
     */
    scrollShadow?: boolean
    /**
     * `auto` reveals the bar on hover/scroll; `never` hides it while keeping content scrollable.
     * @default 'always'
     */
    scrollbarVisibility?: ScrollbarVisibility
    /**
     * Pixels to scroll before the overflow-edge data attributes are applied.
     * @default 0
     */
    overflowEdgeThreshold?: number
    /** Props forwarded to the inner scroll viewport - `onscroll`, `class`, etc. */
    viewportProps?: HTMLAttributes<HTMLDivElement>
    children?: Snippet
  }

  let {
    orientation = 'vertical',
    scrollShadow = false,
    scrollbarVisibility = 'always',
    overflowEdgeThreshold = 0,
    class: className,
    viewportProps,
    children,
    ...rest
  }: ScrollAreaProps = $props()
  const viewportId = $props.id()
  const direction = useDirection()

  let viewport: HTMLDivElement | undefined
  let hovering = $state(false)
  let scrolling = $state(false)
  let overflowYStartRaw = $state(0)
  let overflowYEndRaw = $state(0)
  let overflowXStartRaw = $state(0)
  let overflowXEndRaw = $state(0)
  let hasOverflowY = $state(false)
  let hasOverflowX = $state(false)
  let vThumb = $state({ size: 100, offset: 0 })
  let hThumb = $state({ size: 100, offset: 0 })
  let scrollTimer: ReturnType<typeof setTimeout> | undefined

  const rtl = $derived(direction.current === 'rtl')
  const overflowYStart = $derived(applyThreshold(overflowYStartRaw, overflowEdgeThreshold))
  const overflowYEnd = $derived(applyThreshold(overflowYEndRaw, overflowEdgeThreshold))
  const overflowXStart = $derived(applyThreshold(overflowXStartRaw, overflowEdgeThreshold))
  const overflowXEnd = $derived(applyThreshold(overflowXEndRaw, overflowEdgeThreshold))
  const showVertical = $derived(
    scrollbarVisibility !== 'never' &&
      (orientation === 'vertical' || orientation === 'both') &&
      hasOverflowY,
  )
  const showHorizontal = $derived(
    scrollbarVisibility !== 'never' &&
      (orientation === 'horizontal' || orientation === 'both') &&
      hasOverflowX,
  )
  const showCorner = $derived(showVertical && showHorizontal)

  function thumbMetrics(scroll: number, client: number, total: number) {
    if (total <= 0 || client >= total) return { size: 100, offset: 0 }
    const size = Math.max((client / total) * 100, 10)
    const maxScroll = total - client
    const offset = (scroll / maxScroll) * (100 - size)
    return { size, offset }
  }

  function sync() {
    const node = viewport
    if (!node) return
    const yMax = Math.max(0, node.scrollHeight - node.clientHeight)
    const xMax = Math.max(0, node.scrollWidth - node.clientWidth)
    hasOverflowY = yMax > 0
    hasOverflowX = xMax > 0
    overflowYStartRaw = node.scrollTop
    overflowYEndRaw = Math.max(0, yMax - node.scrollTop)
    const x = overflowXEdges(node, direction.current === 'rtl')
    overflowXStartRaw = x.start
    overflowXEndRaw = x.end
    vThumb = thumbMetrics(node.scrollTop, node.clientHeight, node.scrollHeight)
    hThumb = thumbMetrics(x.start, node.clientWidth, node.scrollWidth)
  }

  $effect(() => {
    void direction.current
    untrack(() => {
      if (viewport) sync()
    })
  })

  function attachViewport(node: HTMLDivElement) {
    return untrack(() => {
      viewport = node
      sync()
      const Observer = typeof ResizeObserver === 'undefined' ? undefined : ResizeObserver
      if (!Observer) {
        return () => {
          if (viewport === node) viewport = undefined
        }
      }
      const ro = new Observer(() => sync())
      ro.observe(node)
      if (node.firstElementChild) ro.observe(node.firstElementChild)
      return () => {
        ro.disconnect()
        if (viewport === node) viewport = undefined
      }
    })
  }

  function handleScroll(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    sync()
    scrolling = true
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      scrolling = false
    }, 600)
    viewportProps?.onscroll?.(event)
  }

  function drag(axis: 'vertical' | 'horizontal', event: PointerEvent) {
    if (!viewport) return
    const viewportNode: HTMLDivElement = viewport
    event.preventDefault()
    event.stopPropagation()
    const trackEl = event.currentTarget as HTMLElement
    trackEl.setPointerCapture(event.pointerId)
    const startPos = axis === 'vertical' ? event.clientY : event.clientX
    const startScroll = axis === 'vertical' ? viewportNode.scrollTop : overflowXStartRaw
    const track = axis === 'vertical' ? trackEl.clientHeight : trackEl.clientWidth
    const thumbSize = axis === 'vertical' ? vThumb.size : hThumb.size
    const maxScroll =
      axis === 'vertical'
        ? viewportNode.scrollHeight - viewportNode.clientHeight
        : viewportNode.scrollWidth - viewportNode.clientWidth
    const travel = track * (1 - thumbSize / 100)
    const mirrored = rtl

    function move(ev: PointerEvent) {
      if (travel <= 0) return
      if (axis === 'vertical') {
        const next = startScroll + ((ev.clientY - startPos) / travel) * maxScroll
        viewportNode.scrollTop = next
        return
      }
      const delta = mirrored ? startPos - ev.clientX : ev.clientX - startPos
      viewportNode.scrollLeft = scrollLeftFromStart(startScroll + (delta / travel) * maxScroll, maxScroll, mirrored)
    }

    function up() {
      trackEl.removeEventListener('pointermove', move)
      trackEl.removeEventListener('pointerup', up)
      trackEl.removeEventListener('pointercancel', up)
    }

    trackEl.addEventListener('pointermove', move)
    trackEl.addEventListener('pointerup', up)
    trackEl.addEventListener('pointercancel', up)
  }

  const overflowStyle = $derived(
    `--scroll-area-overflow-y-start: ${overflowYStart}px; --scroll-area-overflow-y-end: ${overflowYEnd}px; --scroll-area-overflow-x-start: ${overflowXStart}px; --scroll-area-overflow-x-end: ${overflowXEnd}px`,
  )
  const viewportStyle = $derived(
    [overflowStyle, typeof viewportProps?.style === 'string' ? viewportProps.style : undefined]
      .filter(Boolean)
      .join('; '),
  )
  const viewportClass = $derived(
    cn(
      'focus-visible:ring-ring min-h-0 w-full flex-1 rounded-[inherit] outline-none focus-visible:ring-2',
      'scrollbar-none [&::-webkit-scrollbar]:hidden',
      orientation === 'vertical' && 'overflow-y-auto overflow-x-hidden',
      orientation === 'horizontal' && 'overflow-x-auto overflow-y-hidden',
      orientation === 'both' && 'overflow-auto',
      scrollShadow && SCROLL_SHADOW_CLASSES,
      viewportProps?.class,
    ),
  )
  const barClass = $derived(cn(SCROLLBAR_CLASSES, scrollbarVisibility === 'auto' && SCROLLBAR_AUTO_CLASSES))
</script>

<div
  data-slot="scroll-area"
  class={cn('relative flex flex-col', className)}
  data-has-overflow-x={hasOverflowX ? '' : undefined}
  data-has-overflow-y={hasOverflowY ? '' : undefined}
  data-overflow-x-start={overflowXStart > 0 ? '' : undefined}
  data-overflow-x-end={overflowXEnd > 0 ? '' : undefined}
  data-overflow-y-start={overflowYStart > 0 ? '' : undefined}
  data-overflow-y-end={overflowYEnd > 0 ? '' : undefined}
  data-scrolling={scrolling ? '' : undefined}
  onpointerenter={() => (hovering = true)}
  onpointerleave={() => (hovering = false)}
  {...rest}
  dir={direction.current}
>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    {@attach attachViewport}
    id={viewportId}
    data-slot="scroll-area-viewport"
    tabindex={0}
    {...viewportProps}
    class={viewportClass}
    style={viewportStyle}
    onscroll={handleScroll}
  >
    <div
      data-slot="scroll-area-content"
      style={orientation === 'vertical' ? 'min-width: 0' : 'min-width: fit-content'}
    >
      {@render children?.()}
    </div>
  </div>
  {#if showVertical}
    <div
      aria-hidden="true"
      data-slot="scroll-area-scrollbar"
      data-orientation="vertical"
      data-visibility={scrollbarVisibility}
      data-hovering={hovering ? '' : undefined}
      data-scrolling={scrolling ? '' : undefined}
      class={barClass}
      onpointerdown={(event) => drag('vertical', event)}
    >
      <div
        data-slot="scroll-area-thumb"
        data-orientation="vertical"
        class="bg-background-strong pointer-events-none absolute inset-x-0 rounded-full"
        style={`top: ${vThumb.offset}%; height: ${vThumb.size}%`}
      ></div>
    </div>
  {/if}
  {#if showHorizontal}
    <div
      aria-hidden="true"
      data-slot="scroll-area-scrollbar"
      data-orientation="horizontal"
      data-visibility={scrollbarVisibility}
      data-hovering={hovering ? '' : undefined}
      data-scrolling={scrolling ? '' : undefined}
      class={barClass}
      onpointerdown={(event) => drag('horizontal', event)}
    >
      <div
        data-slot="scroll-area-thumb"
        data-orientation="horizontal"
        class="bg-background-strong pointer-events-none absolute inset-y-0 rounded-full"
        style={`inset-inline-start: ${hThumb.offset}%; width: ${hThumb.size}%`}
      ></div>
    </div>
  {/if}
  {#if showCorner}
    <div data-slot="scroll-area-corner" class="absolute inset-e-0 bottom-0"></div>
  {/if}
</div>
