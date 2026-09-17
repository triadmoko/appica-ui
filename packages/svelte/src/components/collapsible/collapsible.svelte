<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Collapsible as BitsCollapsible, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn, commitBindableChange } from '../../internal/utils'
  import { setCollapsibleContext } from './collapsible-context'

  export type CollapsibleProps = WithoutChildrenOrChild<BitsCollapsible.RootProps> & {
    /** Controlled open state. Pair with `onOpenChange` or `bind:open`. */
    open?: boolean
    /**
     * Uncontrolled initial open state.
     * @default false
     */
    defaultOpen?: boolean
    /** Fires when the open state changes. */
    onOpenChange?: (open: boolean) => void
    /**
     * Disable the trigger and skip pointer events.
     * @default false
     */
    disabled?: boolean
    children?: Snippet
  }

  let {
    class: className,
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    disabled,
    children,
    ...rest
  }: CollapsibleProps = $props()

  let innerOpen = $state(false)
  innerOpen = untrack(() => open ?? defaultOpen)

  $effect(() => {
    if (open !== undefined) innerOpen = open
  })

  function handleOpenChange(next: boolean) {
    commitBindableChange({
      next,
      bound: open,
      setBound: (value) => {
        open = value
      },
      setInner: (value) => {
        innerOpen = value
      },
      onChange: onOpenChange,
    })
  }

  const classes = $derived(cn(className))

  setCollapsibleContext({
    get open() {
      return innerOpen
    },
  })
</script>

<BitsCollapsible.Root
  data-slot="collapsible"
  data-open={innerOpen ? '' : undefined}
  class={classes}
  bind:open={innerOpen}
  onOpenChange={handleOpenChange}
  {disabled}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsCollapsible.Root>
