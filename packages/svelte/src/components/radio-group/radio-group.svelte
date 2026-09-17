<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { RadioGroup as BitsRadioGroup, type WithoutChildrenOrChild } from 'bits-ui'
  import { asBitsAttrs, cn, commitBindableChange } from '../../internal/utils'
  import { getFieldContext, mergeFieldControl } from '../field/field-context'

  export type RadioGroupProps = Omit<WithoutChildrenOrChild<BitsRadioGroup.RootProps>, 'readonly'> & {
    /**
     * Uncontrolled initial selected value.
     * @default ''
     */
    defaultValue?: string
    children?: Snippet
  }

  let {
    class: className,
    value = $bindable(),
    defaultValue = '',
    onValueChange,
    orientation = 'vertical',
    name,
    disabled,
    id,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedby,
    children,
    ...rest
  }: RadioGroupProps = $props()

  const field = getFieldContext()
  const control = $derived(
    mergeFieldControl({
      field,
      id,
      name,
      disabled,
      ariaInvalid,
      ariaDescribedby,
    }),
  )

  let inner = $state('')
  inner = untrack(() => value ?? defaultValue)
  const horizontal = $derived(orientation === 'horizontal')
  const classes = $derived(cn('flex', horizontal ? 'flex-wrap gap-4' : 'flex-col gap-2', className))

  $effect(() => {
    if (value !== undefined) inner = value
  })

  function handleValueChange(next: string) {
    field?.clearFormError()
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

<BitsRadioGroup.Root
  data-slot="radio-group"
  class={classes}
  bind:value={inner}
  {orientation}
  name={control.name}
  disabled={control.disabled}
  id={control.id}
  aria-invalid={control.ariaInvalid}
  aria-describedby={control.describedby}
  aria-orientation={orientation}
  onValueChange={handleValueChange}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsRadioGroup.Root>
