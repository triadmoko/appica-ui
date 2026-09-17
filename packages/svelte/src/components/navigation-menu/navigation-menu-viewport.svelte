<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { NavigationMenu as BitsNavigationMenu } from 'bits-ui'
  import type { ClassValue } from 'clsx'
  import { asBitsAttrs, cn } from '../../internal/utils'

  type Props = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: Props = $props()
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
