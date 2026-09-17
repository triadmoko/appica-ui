<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { NavigationMenu as BitsNavigationMenu, Portal, type WithoutChildrenOrChild } from 'bits-ui'
  import type { ClassValue } from 'clsx'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import {
    getNavigationMenuContext,
    type NavigationMenuAlign,
    type NavigationMenuSide,
  } from './navigation-menu-context'

  const POPUP_RADIUS = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
  } as const

  export type NavigationMenuPositionerProps = WithoutChildrenOrChild<BitsNavigationMenu.ViewportProps> & {
    /**
     * Preferred side to open on (vertical defaults to inline-end).
     */
    side?: NavigationMenuSide
    /**
     * Gap between the trigger and the popup.
     * @default 6
     */
    sideOffset?: number
    /**
     * Alignment along the side.
     * @default 'start'
     */
    align?: NavigationMenuAlign
    /**
     * Portal target. Maps to bits-ui Portal `to`.
     */
    container?: Element | string
    children?: Snippet
  }

  let {
    class: className,
    side,
    sideOffset,
    align = 'start',
    container,
    children,
    ...rest
  }: NavigationMenuPositionerProps = $props()

  const ctx = getNavigationMenuContext()
  const direction = useDirection()
  const vertical = $derived(ctx.orientation === 'vertical')
  const resolvedSide = $derived(side ?? (vertical ? 'inline-end' : 'bottom'))
  const offset = $derived(sideOffset ?? ctx.sideOffset)
  const physicalSide = $derived.by((): 'top' | 'right' | 'bottom' | 'left' => {
    const rtl = direction.current === 'rtl'
    switch (resolvedSide) {
      case 'top':
      case 'bottom':
      case 'left':
      case 'right':
        return resolvedSide
      case 'inline-end':
        return rtl ? 'left' : 'right'
      case 'inline-start':
        return rtl ? 'right' : 'left'
      default: {
        const _exhaustive: never = resolvedSide
        return _exhaustive
      }
    }
  })

  function place(node: HTMLElement) {
    const root = ctx.rootEl()
    const trigger = root?.querySelector<HTMLElement>(
      '[data-slot="navigation-menu-trigger"][data-state="open"]',
    )
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const width = node.offsetWidth
    const height = node.offsetHeight
    let top = rect.bottom + offset
    let left = rect.left

    switch (physicalSide) {
      case 'bottom':
        top = rect.bottom + offset
        left = alignLeft(rect, width)
        break
      case 'top':
        top = rect.top - height - offset
        left = alignLeft(rect, width)
        break
      case 'right':
        top = alignTop(rect, height)
        left = rect.right + offset
        break
      case 'left':
        top = alignTop(rect, height)
        left = rect.left - width - offset
        break
      default: {
        const _exhaustive: never = physicalSide
        return _exhaustive
      }
    }

    node.style.top = `${top}px`
    node.style.left = `${left}px`
  }

  function alignLeft(rect: DOMRect, width: number) {
    if (align === 'center') return rect.left + rect.width / 2 - width / 2
    if (align === 'end') return direction.current === 'rtl' ? rect.left : rect.right - width
    return direction.current === 'rtl' ? rect.right - width : rect.left
  }

  function alignTop(rect: DOMRect, height: number) {
    if (align === 'center') return rect.top + rect.height / 2 - height / 2
    if (align === 'end') return rect.bottom - height
    return rect.top
  }

  function attachPositioner(node: HTMLElement) {
    const update = () => place(node)
    const observer = new ResizeObserver(update)
    observer.observe(node)
    const popup = node.querySelector<HTMLElement>('[data-slot="navigation-menu-popup"]')
    if (popup) observer.observe(popup)
    const root = ctx.rootEl()
    let mutations: MutationObserver | undefined
    if (root) {
      observer.observe(root)
      mutations = new MutationObserver(update)
      mutations.observe(root, { attributes: true, subtree: true, attributeFilter: ['data-state'] })
    }
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    update()
    requestAnimationFrame(update)
    return () => {
      observer.disconnect()
      mutations?.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }
</script>

<Portal to={container}>
  {#if ctx.backdrop && ctx.isOpen()}
    <div
      data-slot="navigation-menu-backdrop"
      class={cn(
        'pointer-events-none fixed inset-0 z-40 bg-black/30 backdrop-blur-sm supports-[-webkit-touch-callout:none]:absolute',
        'motion-safe:transition-opacity motion-safe:duration-250 motion-safe:ease-out',
        'data-ending-style:motion-safe:opacity-0 data-starting-style:motion-safe:opacity-0',
        'in-data-[state=closed]:motion-safe:opacity-0',
      )}
    ></div>
  {/if}
  <div
    data-slot="navigation-menu-positioner"
    data-side={physicalSide}
    dir={direction.current === 'rtl' ? 'rtl' : undefined}
    class={cn(
      'pointer-events-none fixed isolate z-50',
      ctx.morph && [
        'motion-safe:transition-[top,left] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]',
        'data-instant:motion-safe:transition-none',
      ],
    )}
    {@attach attachPositioner}
  >
    <BitsNavigationMenu.Viewport forceMount {...asBitsAttrs(rest)}>
      {#snippet child({ props })}
        {@const bitsClass = typeof props.class === 'string' ? props.class : ''}
        <div
          {...props}
          data-slot="navigation-menu-popup"
          class={cn(
            bitsClass as ClassValue,
            'pointer-events-auto bg-background border-border-overlay relative overflow-hidden border shadow-2xl outline-none',
            POPUP_RADIUS[ctx.size],
            ctx.morph &&
              'h-(--bits-navigation-menu-viewport-height) w-(--bits-navigation-menu-viewport-width)',
            'origin-(--transform-origin)',
            ctx.morph
              ? 'motion-safe:[transition:opacity_300ms_cubic-bezier(0.175,0.885,0.32,1.5),scale_300ms_cubic-bezier(0.175,0.885,0.32,1.5),width_300ms_cubic-bezier(0.22,1,0.36,1),height_300ms_cubic-bezier(0.22,1,0.36,1)]'
              : 'motion-safe:transition-[opacity,scale] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.175,0.885,0.32,1.5)]',
            'data-starting-style:motion-safe:scale-95 data-starting-style:motion-safe:opacity-0',
            'data-ending-style:motion-safe:scale-95 data-ending-style:motion-safe:opacity-0 data-ending-style:motion-safe:duration-150 data-ending-style:motion-safe:ease-out',
            'data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0 data-[state=closed]:scale-95',
            className,
          )}
        >
          {@render children?.()}
        </div>
      {/snippet}
    </BitsNavigationMenu.Viewport>
  </div>
</Portal>
