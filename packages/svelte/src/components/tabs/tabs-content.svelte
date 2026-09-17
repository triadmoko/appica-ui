<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Tabs as BitsTabs } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { useReducedMotion } from '../../hooks/use-reduced-motion/use-reduced-motion'
  import { getTabsContext } from './tabs-context'
  import { tabsContentClasses } from './tabs-variants'

  export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
    /** Value of the tab this panel belongs to. */
    value: string
    /**
     * Keep inactive panels mounted (hidden) instead of unmounting them.
     * @default false
     */
    keepMounted?: boolean
    children?: Snippet
  }

  let { class: className, value, keepMounted = false, children, ...rest }: TabsContentProps = $props()

  const ctx = getTabsContext()
  const reduced = useReducedMotion()
  const mounted = $derived(keepMounted || ctx.value === value)
  const fadeDuration = $derived(keepMounted || reduced.current ? 0 : 400)
  const classes = $derived(cn(tabsContentClasses, className))
</script>

{#if mounted}
  <BitsTabs.Content data-slot="tabs-content" {value} class={classes} {...asBitsAttrs(rest)}>
    <div in:fade={{ duration: fadeDuration }}>
      {@render children?.()}
    </div>
  </BitsTabs.Content>
{/if}
