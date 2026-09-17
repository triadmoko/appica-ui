<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '../../internal/utils'

  export type DrawerIndentBackgroundProps = HTMLAttributes<HTMLDivElement>

  let { class: className, ...rest }: DrawerIndentBackgroundProps = $props()
</script>

<div data-slot="drawer-indent-background" class={cn('bg-background fixed inset-0 -z-10', className)} {...rest}></div>
