<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  export type FieldsetLegendProps = HTMLAttributes<HTMLLegendElement> & {
    children?: Snippet
  }

  let { class: className, children, ...rest }: FieldsetLegendProps = $props()
</script>

<legend data-slot="fieldset-legend" class={cn('text-foreground-intense text-lg font-medium', className)} {...rest}>
  {@render children?.()}
</legend>
