<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { getPopoverContext } from './popover-context'

  export type PopoverTitleProps = HTMLAttributes<HTMLHeadingElement> & {
    children?: Snippet
  }

  let { class: className, id, children, ...rest }: PopoverTitleProps = $props()

  const ctx = getPopoverContext()
  const resolvedId = $derived(id ?? ctx?.titleId)

  $effect(() => {
    ctx?.setTitled(true)
    return () => ctx?.setTitled(false)
  })
</script>

<h2
  data-slot="popover-title"
  id={resolvedId}
  class={cn('text-foreground-intense text-base font-semibold', className)}
  {...rest}
>
  {@render children?.()}
</h2>
