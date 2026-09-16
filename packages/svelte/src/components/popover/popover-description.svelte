<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { getPopoverContext } from './popover-context'

  type Props = HTMLAttributes<HTMLParagraphElement> & {
    children?: Snippet
  }

  let { class: className, id, children, ...rest }: Props = $props()

  const ctx = getPopoverContext()
  const resolvedId = $derived(id ?? ctx?.descriptionId)

  $effect(() => {
    ctx?.setDescribed(true)
    return () => ctx?.setDescribed(false)
  })
</script>

<p data-slot="popover-description" id={resolvedId} class={cn('text-sm', className)} {...rest}>
  {@render children?.()}
</p>
