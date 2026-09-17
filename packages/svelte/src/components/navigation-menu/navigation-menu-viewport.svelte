<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { NavigationMenu as BitsNavigationMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import type { ClassValue } from 'clsx'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type NavigationMenuViewportProps = WithoutChildrenOrChild<BitsNavigationMenu.ViewportProps> & { children?: Snippet }

  let { class: className, children, ...rest }: NavigationMenuViewportProps = $props()
</script>

<BitsNavigationMenu.Viewport forceMount {...asBitsAttrs(rest)}>
  {#snippet child({ props })}
    {@const bitsClass = typeof props.class === 'string' ? props.class : ''}
    <div
      {...props}
      data-slot="navigation-menu-viewport"
      class={cn(bitsClass as ClassValue, 'relative overflow-hidden', className)}
    >
      {@render children?.()}
    </div>
  {/snippet}
</BitsNavigationMenu.Viewport>
