<script lang="ts">
  import Button from '../button/button.svelte'
  import ButtonGroup from './button-group.svelte'
  import type { ButtonGroupSize, ButtonGroupVariant } from '../button/button-group-context'

  let {
    variant,
    size,
    disabled,
    orientation,
    class: className,
    override = false,
    nested = false,
    childDisabled = false,
    childDisabledFalse = false,
  }: {
    variant?: ButtonGroupVariant
    size?: ButtonGroupSize
    disabled?: boolean
    orientation?: 'horizontal' | 'vertical'
    class?: string
    override?: boolean
    nested?: boolean
    childDisabled?: boolean
    childDisabledFalse?: boolean
  } = $props()
</script>

<ButtonGroup {variant} {size} {disabled} {orientation} class={className}>
  {#if nested}
    <span data-testid="wrapper">
      <Button data-testid="nested">Wrapped</Button>
    </span>
  {:else if override}
    <Button size="sm" variant="ghost" data-testid="overridden">One</Button>
    <Button data-testid="inherits">Two</Button>
  {:else if childDisabled}
    <Button disabled data-testid="own">Own</Button>
    <Button data-testid="other">Other</Button>
  {:else if childDisabledFalse}
    <Button disabled={false} data-testid="b">B</Button>
  {:else}
    <Button data-testid="a">One</Button>
    <Button data-testid="b">Two</Button>
    <Button>Three</Button>
  {/if}
</ButtonGroup>
