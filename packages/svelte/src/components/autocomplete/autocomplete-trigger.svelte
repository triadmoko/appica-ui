<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { getAutocompleteContext } from './autocomplete-context'

  type Props = HTMLButtonAttributes & { children?: Snippet }

  let { class: className, disabled, children, ...rest }: Props = $props()

  const ctx = getAutocompleteContext()
</script>

<button
  type="button"
  data-slot="autocomplete-trigger"
  {disabled}
  class={cn(
    'cursor-pointer outline-none',
    'data-disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:cursor-not-allowed',
    className,
  )}
  onclick={() => ctx.toggle()}
  {...rest}
>
  {@render children?.()}
</button>
