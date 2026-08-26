<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { formatPercent, getMeterContext } from './meter-context'

  type Props = HTMLAttributes<HTMLSpanElement> & { children?: Snippet<[string]> }

  let { class: className, children, ...rest }: Props = $props()

  const ctx = getMeterContext()
  const formatted = $derived(formatPercent(ctx.value(), ctx.min(), ctx.max()))
</script>

<span data-slot="meter-value" class={cn('text-foreground text-sm', className)} {...rest}>
  {#if children}
    {@render children(formatted)}
  {:else}
    {formatted}
  {/if}
</span>
