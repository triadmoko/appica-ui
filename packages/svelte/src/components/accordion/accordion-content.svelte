<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Accordion as BitsAccordion } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getAccordionContext } from './accordion-context'

  const EXIT_MS = 400

  export type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Keep the panel mounted while closed.
     * @default false
     */
    keepMounted?: boolean
    /**
     * Let the browser's find-in-page expand the panel. Implies `keepMounted`.
     * @default false
     */
    hiddenUntilFound?: boolean
    children?: Snippet
  }

  let {
    class: className,
    keepMounted,
    hiddenUntilFound,
    children,
    ...rest
  }: AccordionContentProps = $props()

  const root = getAccordionContext()
  const persistMounted = $derived(keepMounted ?? root.keepMounted)
  const persistUntilFound = $derived(hiddenUntilFound ?? root.hiddenUntilFound)
  const persist = $derived(persistMounted || persistUntilFound)

  let lingering = $state(false)
  const forceMount = $derived(persist || lingering)

  const classes = $derived(
    cn(
      'grid overflow-hidden',
      'grid-rows-[1fr] data-[state=closed]:grid-rows-[0fr]',
      'data-starting-style:grid-rows-[0fr] data-ending-style:grid-rows-[0fr]',
      'transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
      'motion-reduce:transition-none',
      className,
    ),
  )

  function attachPresence(node: HTMLElement) {
    untrack(() => {
      lingering = true
    })

    function dismiss() {
      if (persist) return
      if (node.getAttribute('data-state') !== 'closed') return
      lingering = false
    }

    function onTransitionEnd(event: TransitionEvent) {
      if (event.target !== node) return
      dismiss()
    }

    node.addEventListener('transitionend', onTransitionEnd)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let timer: ReturnType<typeof setTimeout> | undefined
    const observer = new MutationObserver(() => {
      if (timer) clearTimeout(timer)
      if (node.getAttribute('data-state') !== 'closed' || persist) return
      timer = setTimeout(dismiss, reduced ? 0 : EXIT_MS)
    })
    observer.observe(node, { attributes: true, attributeFilter: ['data-state'] })
    if (node.getAttribute('data-state') === 'closed' && !persist) {
      timer = setTimeout(dismiss, reduced ? 0 : EXIT_MS)
    }

    return () => {
      node.removeEventListener('transitionend', onTransitionEnd)
      observer.disconnect()
      if (timer) clearTimeout(timer)
    }
  }
</script>

<BitsAccordion.Content
  data-slot="accordion-content"
  class={classes}
  {forceMount}
  hiddenUntilFound={persistUntilFound}
  {...asBitsAttrs(rest)}
>
  {#snippet child({ props, open })}
    {#if persist || open || lingering}
      <div {...props} {@attach attachPresence}>
        <div class="min-h-0 overflow-hidden">
          <div class="pt-3">
            {@render children?.()}
          </div>
        </div>
      </div>
    {/if}
  {/snippet}
</BitsAccordion.Content>
