<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Tabs as BitsTabs } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { getTabsContext, setTabsContext } from './tabs-context'
  import { tabsIndicatorVariants, tabsListVariants, type TabsListVariant, type TabsSize } from './tabs-variants'

  export type TabsListProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Override the root's variant for this list.
     * @default context
     */
    variant?: TabsListVariant
    /**
     * Override the root's size for this list.
     * @default context
     */
    size?: TabsSize
    children?: Snippet
  }

  let { class: className, variant: variantProp, size: sizeProp, children, ...rest }: TabsListProps = $props()

  const ctx = getTabsContext()
  const dir = useDirection()
  const variant = $derived(variantProp ?? ctx.variant)
  const size = $derived(sizeProp ?? ctx.size)

  setTabsContext({
    get variant() {
      return variant
    },
    get size() {
      return size
    },
    get orientation() {
      return ctx.orientation
    },
    get value() {
      return ctx.value
    },
  })

  const classes = $derived(cn(tabsListVariants({ variant, size }), className))

  let listEl = $state<HTMLElement | null>(null)
  let measured = $state(false)

  $effect(() => {
    const node = listEl
    const _dir = dir.current
    void _dir
    if (!node) return

    let observedTab: HTMLElement | null = null
    let ro: ResizeObserver

    const update = () => {
      const active = node.querySelector<HTMLElement>('[data-slot="tabs-trigger"][data-state="active"]')
      if (!active) return
      if (observedTab !== active) {
        if (observedTab) ro.unobserve(observedTab)
        observedTab = active
        ro.observe(active)
      }
      const listRect = node.getBoundingClientRect()
      const tabRect = active.getBoundingClientRect()
      node.style.setProperty('--active-tab-left', `${tabRect.left - listRect.left}px`)
      node.style.setProperty('--active-tab-right', `${listRect.right - tabRect.right}px`)
      node.style.setProperty('--active-tab-top', `${tabRect.top - listRect.top}px`)
      node.style.setProperty('--active-tab-bottom', `${listRect.bottom - tabRect.bottom}px`)
      node.style.setProperty('--active-tab-width', `${tabRect.width}px`)
      node.style.setProperty('--active-tab-height', `${tabRect.height}px`)
      measured = true
    }

    ro = new ResizeObserver(update)
    const observer = new MutationObserver(update)
    observer.observe(node, { attributes: true, subtree: true, attributeFilter: ['data-state'] })
    ro.observe(node)
    queueMicrotask(update)
    return () => {
      observer.disconnect()
      ro.disconnect()
    }
  })

  const indicatorClass = $derived(
    cn(tabsIndicatorVariants({ variant }), !measured && 'opacity-0 transition-none'),
  )
</script>

<BitsTabs.List bind:ref={listEl} data-slot="tabs-list" class={classes} {...asBitsAttrs(rest)}>
  <span
    data-slot="tabs-indicator"
    data-orientation={ctx.orientation}
    class={indicatorClass}
    aria-hidden="true"
  ></span>
  {@render children?.()}
</BitsTabs.List>
