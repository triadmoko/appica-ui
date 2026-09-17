<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { getDrawerProviderContext } from './drawer-context'

  export type DrawerIndentProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, style, children, ...rest }: DrawerIndentProps = $props()

  const provider = getDrawerProviderContext()
  const active = $derived((provider?.openCount ?? 0) > 0)

  function attachIndent(node: HTMLElement) {
    $effect(() => {
      node.style.setProperty('--drawer-swipe-progress', String(provider?.swipeProgress ?? 0))
    })
  }
</script>

<div
  data-slot="drawer-indent"
  data-active={active ? '' : undefined}
  data-inactive={active ? undefined : ''}
  class={cn(
    '[--indent-transition:calc(1-clamp(0,calc(var(--drawer-swipe-progress)*100000),1))]',
    'origin-top overflow-hidden transition-[transform,border-radius] ease-[cubic-bezier(0.32,0.72,0,1)]',
    'motion-safe:duration-[calc(var(--indent-transition)*400ms)] motion-reduce:transition-none',
    'data-active:transform-[scale(calc(0.95+0.03*var(--drawer-swipe-progress)))] data-active:rounded-2xl',
    className,
  )}
  {...rest}
  {style}
  {@attach attachIndent}
>
  {@render children?.()}
</div>
