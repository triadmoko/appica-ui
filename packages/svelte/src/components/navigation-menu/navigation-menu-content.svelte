<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { NavigationMenu as BitsNavigationMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getNavigationMenuContext, setNavigationMenuContentContext } from './navigation-menu-context'

  const CONTENT_PADDING = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  } as const

  export type NavigationMenuContentProps = WithoutChildrenOrChild<BitsNavigationMenu.ContentProps> & {
    /**
     * Keep the content in the DOM while closed, so SSR and search can reach it.
     * @default false
     */
    keepMounted?: boolean
    children?: Snippet
  }

  let { class: className, keepMounted = false, children, ...rest }: NavigationMenuContentProps = $props()

  const ctx = getNavigationMenuContext()
  setNavigationMenuContentContext(true)

  const classes = $derived(
    cn(
      ctx.morph && [
        'absolute inset-0',
        'motion-safe:transition-[opacity,translate] motion-safe:duration-350 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]',
        'data-starting-style:motion-safe:opacity-0',
        'data-ending-style:motion-safe:opacity-0',
        'data-[state=closed]:motion-safe:opacity-0',
        'data-[motion=from-start]:motion-safe:-translate-x-4',
        'data-[motion=from-end]:motion-safe:translate-x-4',
        'data-[motion=to-start]:motion-safe:translate-x-4',
        'data-[motion=to-end]:motion-safe:-translate-x-4',
      ],
    ),
  )
  const bodyClasses = $derived(cn('w-max', CONTENT_PADDING[ctx.size], className))
</script>

<BitsNavigationMenu.Content
  data-slot="navigation-menu-content"
  class={classes}
  forceMount={keepMounted ? true : undefined}
  {...asBitsAttrs(rest)}
>
  <div class={bodyClasses}>
    {@render children?.()}
  </div>
</BitsNavigationMenu.Content>
