<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { Toggle as BitsToggle, ToggleGroup as BitsToggleGroup } from 'bits-ui'
  import { asBitsAttrs, cn, commitBindableChange } from '../../internal/utils'
  import { tryGetToolbarContext } from '../toolbar/toolbar-context.svelte'
  import { getToggleGroupContext } from '../toggle-group/toggle-group-context'

  type Props = HTMLButtonAttributes & {
    /** Controlled pressed state. Pair with `onPressedChange` or `bind:pressed`. */
    pressed?: boolean
    /**
     * Uncontrolled initial pressed state.
     * @default false
     */
    defaultPressed?: boolean
    /** Fires when the pressed state is committed. */
    onPressedChange?: (pressed: boolean) => void
    /** Identity of this toggle inside a `ToggleGroup`. Required in a group. */
    value?: string
    children?: Snippet
  }

  let {
    class: className,
    pressed = $bindable(),
    defaultPressed = false,
    onPressedChange,
    value,
    disabled,
    children,
    ...rest
  }: Props = $props()

  const inGroup = getToggleGroupContext()
  const toolbar = tryGetToolbarContext()
  let inner = $state(false)
  let node = $state<HTMLElement | undefined>()
  inner = untrack(() => pressed ?? defaultPressed)
  const isDisabled = $derived(Boolean(disabled || toolbar?.disabled))
  const tabIndex = $derived(toolbar && node && toolbar.isTabStop(node) ? 0 : -1)
  const classes = $derived(cn(className))

  function attach(el: HTMLElement) {
    node = el
    if (!toolbar) return
    return toolbar.register({ el, disabled: () => isDisabled })
  }

  function handleFocus() {
    if (node && toolbar) toolbar.tabStop = node
  }

  $effect(() => {
    if (pressed !== undefined) inner = pressed
  })

  function handlePressedChange(next: boolean) {
    commitBindableChange({
      next,
      bound: pressed,
      setBound: (value) => {
        pressed = value
      },
      setInner: (value) => {
        inner = value
      },
      onChange: onPressedChange,
    })
  }
</script>

{#if inGroup}
  <BitsToggleGroup.Item value={value ?? ''} disabled={isDisabled} data-slot="toggle" class={classes} {...asBitsAttrs(rest)}>
    {#snippet child({ props, pressed: itemPressed })}
      <button
        {...props}
        {@attach attach}
        role={undefined}
        aria-checked={undefined}
        aria-pressed={itemPressed}
        data-slot="toggle"
        data-pressed={itemPressed ? '' : undefined}
        data-disabled={isDisabled ? '' : undefined}
        tabindex={toolbar ? tabIndex : props.tabindex}
        onfocus={handleFocus}
      >
        {@render children?.()}
      </button>
    {/snippet}
  </BitsToggleGroup.Item>
{:else}
  <BitsToggle.Root
    {@attach attach}
    bind:pressed={inner}
    onPressedChange={handlePressedChange}
    disabled={isDisabled}
    data-slot="toggle"
    data-pressed={inner ? '' : undefined}
    data-disabled={toolbar && isDisabled ? '' : undefined}
    tabindex={toolbar ? tabIndex : undefined}
    onfocus={handleFocus}
    class={classes}
    {...asBitsAttrs(rest)}
  >
    {@render children?.()}
  </BitsToggle.Root>
{/if}
