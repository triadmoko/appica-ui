<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { getAutocompleteContext } from './autocomplete-context'

  type Props = HTMLAttributes<HTMLSpanElement> & {
    placeholder?: string
    children?: Snippet
  }

  let { class: className, placeholder, children, ...rest }: Props = $props()

  const ctx = getAutocompleteContext()
  const empty = $derived(!ctx.hasValue())
</script>

<span data-slot="autocomplete-value" class={cn('min-w-0 flex-1 truncate text-start', empty && 'text-foreground-subtle', className)} {...rest}>
  {#if empty}
    {placeholder ?? ''}
  {:else if children}
    {@render children()}
  {:else}
    {ctx.multiple ? (ctx.selected() as string[]).join(', ') : ctx.selected()}
  {/if}
</span>
