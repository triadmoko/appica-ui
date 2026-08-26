<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { untrack } from 'svelte'
  import { Checkbox as BitsCheckbox } from 'bits-ui'
  import { useReducedMotion } from '../../hooks/use-reduced-motion/use-reduced-motion'
  import { asBitsAttrs, cn, commitBindableChange, invalidDataAttr } from '../../internal/utils'

  const SQUISH_MS = 300
  const SQUISH_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'

  type Props = HTMLButtonAttributes & {
    /** Controlled checked state. Pair with `onCheckedChange` or `bind:checked`. */
    checked?: boolean
    /**
     * Uncontrolled initial checked state.
     * @default false
     */
    defaultChecked?: boolean
    /** Fires when the checked state is committed. */
    onCheckedChange?: (checked: boolean) => void
    /**
     * Mixed state. Sets `aria-checked="mixed"` and draws a dash.
     * @default false
     */
    indeterminate?: boolean
    /** Field name submitted with a form, via a hidden input. */
    name?: string
    /**
     * Value submitted with the form, and the identity of this box inside a `CheckboxGroup`.
     * Falls back to `name` when used in a group.
     */
    value?: string
  }

  let {
    class: className,
    checked = $bindable(),
    defaultChecked = false,
    onCheckedChange,
    indeterminate = false,
    name,
    value,
    disabled,
    ...rest
  }: Props = $props()

  const reducedMotion = useReducedMotion()
  let inner = $state(false)
  inner = untrack(() => checked ?? defaultChecked)

  $effect(() => {
    if (checked !== undefined) inner = checked
  })

  function handleCheckedChange(next: boolean) {
    commitBindableChange({
      next,
      bound: checked,
      setBound: (value) => {
        checked = value
      },
      setInner: (value) => {
        inner = value
      },
      onChange: onCheckedChange,
    })
  }

  let rootEl: HTMLElement | null = $state(null)
  let prevChecked: boolean | null = null
  let prevIndeterminate: boolean | null = null

  $effect(() => {
    const nextChecked = inner
    const nextIndeterminate = indeterminate
    const el = rootEl
    const reduced = reducedMotion.current
    if (prevChecked === null) {
      prevChecked = nextChecked
      prevIndeterminate = nextIndeterminate
      return
    }
    const toggled = prevChecked !== nextChecked || prevIndeterminate !== nextIndeterminate
    prevChecked = nextChecked
    prevIndeterminate = nextIndeterminate
    if (toggled && !reduced && el) {
      el.animate([{ scale: '1' }, { scale: '0.8' }, { scale: '1.1' }, { scale: '1' }], {
        duration: SQUISH_MS,
        easing: SQUISH_EASING,
      })
    }
  })

  const classes = $derived(
    cn(
      'flex size-[1em] min-h-4 min-w-4 shrink-0 cursor-default items-center justify-center',
      'bg-background border-border-strong outline-ring-input rounded-[calc(tan(atan2(var(--radius-3xs),1rem))*100%)] border',
      'transition-[background-color,border-color,box-shadow] duration-200 motion-reduce:transition-none',
      'hover:data-[state=unchecked]:not-data-disabled:not-data-invalid:border-border-emphasis',
      'focus-visible:border-transparent!',
      'data-[state=checked]:bg-primary data-[state=checked]:outline-ring-primary data-[state=checked]:border-transparent',
      'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:outline-ring-primary data-[state=indeterminate]:border-transparent',
      'data-disabled:data-[state=unchecked]:bg-background-subtle data-disabled:data-[state=checked]:opacity-disabled data-disabled:data-[state=indeterminate]:opacity-disabled data-disabled:cursor-not-allowed data-disabled:data-[state=unchecked]:border-dashed',
      'data-invalid:border-error data-invalid:data-[state=unchecked]:bg-error-subtle data-invalid:outline-ring-error',
      className,
    ),
  )

  const groupValue = $derived(value ?? name)
</script>

<BitsCheckbox.Root
  bind:ref={rootEl}
  data-slot="checkbox"
  class={classes}
  bind:checked={inner}
  {indeterminate}
  {disabled}
  {name}
  value={groupValue}
  onCheckedChange={handleCheckedChange}
  {...asBitsAttrs(rest)}
  {...invalidDataAttr(rest['aria-invalid'])}
>
  {#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
    {@const showCheck = isChecked && !isIndeterminate}
    {@const showDash = isIndeterminate}
    {@const reduced = reducedMotion.current}
    <span data-slot="checkbox-indicator" class="flex items-center justify-center">
      <svg
        class="text-primary-foreground size-[1em] min-h-4 min-w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M4 8.5l2.5 2.5 5.5-5.5"
          style:stroke-dasharray="20"
          style:stroke-dashoffset={showCheck ? 0 : 20}
          style:opacity={showDash ? 0 : 1}
          style:transition={reduced
            ? 'none'
            : `stroke-dashoffset ${showCheck ? '0.3s' : '0s'} ease-out ${showCheck ? '0.15s' : '0s'}, opacity 0.1s`}
        />
        <line
          x1="4"
          y1="8"
          x2="12"
          y2="8"
          style:transform={showDash ? 'scaleX(1)' : 'scaleX(0)'}
          style:opacity={showDash ? 1 : 0}
          style:transform-origin="center"
          style:transition={reduced
            ? 'none'
            : `transform ${showDash ? '0.2s' : '0s'} ease-out ${showDash ? '0.15s' : '0s'}, opacity ${showDash ? '0.15s' : '0s'} ${showDash ? '0.2s' : '0s'}`}
        />
      </svg>
    </span>
  {/snippet}
</BitsCheckbox.Root>
