<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Checkbox as BitsCheckbox } from 'bits-ui'
  import { asBitsAttrs, cn, commitBindableChange } from '../../internal/utils'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /** Controlled selected values. Pair with `onValueChange` or `bind:value`. */
    value?: string[]
    /**
     * Uncontrolled initial selected values.
     * @default []
     */
    defaultValue?: string[]
    /** Fires when the selected values change. */
    onValueChange?: (value: string[]) => void
    /**
     * Stack the boxes in a column, or wrap them into a row.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical'
    /** Field name submitted with a form for every child checkbox. */
    name?: string
    /**
     * Disable every checkbox in the group.
     * @default false
     */
    disabled?: boolean
    children?: Snippet
  }

  let {
    class: className,
    value = $bindable(),
    defaultValue = [],
    onValueChange,
    orientation = 'vertical',
    name,
    disabled,
    children,
    ...rest
  }: Props = $props()

  let inner = $state<string[]>([])
  inner = untrack(() => value ?? defaultValue)
  const horizontal = $derived(orientation === 'horizontal')
  const classes = $derived(cn('flex', horizontal ? 'flex-wrap gap-4' : 'flex-col gap-2', className))

  $effect(() => {
    if (value !== undefined) inner = value
  })

  function handleValueChange(next: string[]) {
    commitBindableChange({
      next,
      bound: value,
      setBound: (nextValue) => {
        value = nextValue
      },
      setInner: (nextValue) => {
        inner = nextValue
      },
      onChange: onValueChange,
    })
  }
</script>

<BitsCheckbox.Group
  data-slot="checkbox-group"
  class={classes}
  bind:value={inner}
  {name}
  {disabled}
  onValueChange={handleValueChange}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsCheckbox.Group>
