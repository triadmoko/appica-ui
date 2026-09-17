<script lang="ts">
  import type { Snippet } from 'svelte'
  import ScrollArea from './scroll-area.svelte'

  let {
    orientation = 'vertical',
    scrollShadow = false,
    scrollbarVisibility = 'always',
    overflowEdgeThreshold = 0,
    class: className = 'h-40 w-80',
    children,
  }: {
    orientation?: 'vertical' | 'horizontal' | 'both'
    scrollShadow?: boolean
    scrollbarVisibility?: 'always' | 'auto' | 'never'
    overflowEdgeThreshold?: number
    class?: string
    children?: Snippet
  } = $props()
</script>

<ScrollArea
  {orientation}
  {scrollShadow}
  {scrollbarVisibility}
  {overflowEdgeThreshold}
  class={className}
>
  {#if children}
    {@render children()}
  {:else}
    {#each Array.from({ length: 40 }, (_, i) => i + 1) as n (n)}
      <p>Item {n}</p>
    {/each}
  {/if}
</ScrollArea>
