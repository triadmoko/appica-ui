<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Collapsible as BitsCollapsible } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getCollapsibleContext } from './collapsible-context'

  type Props = HTMLButtonAttributes & {
    children?: Snippet
  }

  let { class: className, disabled, children, ...rest }: Props = $props()

  const ctx = getCollapsibleContext()
  const classes = $derived(
    cn(
      'outline-ring cursor-pointer select-none',
      'data-disabled:opacity-disabled data-disabled:pointer-events-none',
      className,
    ),
  )
</script>

<BitsCollapsible.Trigger {disabled} class={classes} {...asBitsAttrs(rest)}>
  {#snippet child({ props })}
    <button {...props} data-slot="collapsible-trigger" data-panel-open={ctx.open ? '' : undefined}>
      {@render children?.()}
    </button>
  {/snippet}
</BitsCollapsible.Trigger>
