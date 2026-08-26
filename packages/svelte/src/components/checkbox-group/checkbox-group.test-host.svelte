<script lang="ts">
  import Checkbox from '../checkbox/checkbox.svelte'
  import CheckboxGroup from './checkbox-group.svelte'

  let {
    orientation,
    defaultValue,
    value,
    onValueChange,
    class: className,
    testId,
  }: {
    orientation?: 'horizontal' | 'vertical'
    defaultValue?: string[]
    value?: string[]
    onValueChange?: (value: string[]) => void
    class?: string
    testId?: string
  } = $props()
</script>

<CheckboxGroup
  aria-label="Toppings"
  {orientation}
  {defaultValue}
  {value}
  {onValueChange}
  class={className}
  data-testid={testId}
>
  <Checkbox value="cheese" aria-label="Cheese" />
  <Checkbox value="bacon" aria-label="Bacon" />
</CheckboxGroup>
