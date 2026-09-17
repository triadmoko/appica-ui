<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { getComboboxContext } from './combobox-context'

  const EMPTY_SIZE = {
    sm: 'px-2.5 py-2 text-xs',
    md: 'px-3 py-2.5 text-sm',
    lg: 'px-3.5 py-3 text-base',
  } as const

  export type ComboboxEmptyProps = HTMLAttributes<HTMLDivElement> & { children?: Snippet }

  let { class: className, children, ...rest }: ComboboxEmptyProps = $props()

  const ctx = getComboboxContext()
</script>

<div
  data-slot="combobox-empty"
  class={cn(
    'text-foreground-muted hidden text-center group-data-empty/combobox-content:block',
    EMPTY_SIZE[ctx.size],
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
