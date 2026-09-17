<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Checkbox as BitsCheckbox, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn, commitBindableChange } from '../../internal/utils'
  import { setCheckboxGroupContext } from './checkbox-group-context'

  export type CheckboxGroupProps = WithoutChildrenOrChild<BitsCheckbox.GroupProps> & {
    /**
     * Uncontrolled initial selected values.
     * @default []
     */
    defaultValue?: string[]
    /**
     * Every child value - required to drive a `parent` "select all" checkbox.
     */
    allValues?: string[]
    /**
     * Stack the boxes in a column, or wrap them into a row.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical'
    children?: Snippet
  }

  let {
    class: className,
    value = $bindable(),
    defaultValue = [],
    onValueChange,
    allValues,
    orientation = 'vertical',
    name,
    disabled,
    children,
    ...rest
  }: CheckboxGroupProps = $props()

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

  setCheckboxGroupContext({
    getValue: () => inner,
    setValue: handleValueChange,
    allValues: () => allValues,
  })
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
