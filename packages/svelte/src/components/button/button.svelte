<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import type { VariantProps } from 'class-variance-authority'
  import { cn } from '../../internal/utils'
  import { getButtonGroupContext } from './button-group-context'
  import { buttonVariants } from './button-variants'

  type ButtonVariant = VariantProps<typeof buttonVariants>['variant']
  type ButtonSize = VariantProps<typeof buttonVariants>['size']

  type Props = HTMLButtonAttributes &
    HTMLAnchorAttributes & {
      /**
       * Visual style.
       * @default 'primary'
       */
      variant?: ButtonVariant
      /**
       * Height and padding. The `icon-*` sizes are square, for icon-only buttons.
       * @default 'md'
       */
      size?: ButtonSize
      children?: Snippet
    }

  let {
    class: className,
    variant,
    size,
    disabled,
    href,
    type = 'button',
    children,
    ...rest
  }: Props = $props()

  const group = getButtonGroupContext()
  const resolvedVariant = $derived(variant ?? group?.variant)
  const resolvedSize = $derived(size ?? group?.size)
  const resolvedDisabled = $derived(Boolean(disabled || group?.disabled))
  const classes = $derived(cn(buttonVariants({ variant: resolvedVariant, size: resolvedSize }), className))
</script>

{#if href}
  <a
    data-slot="button"
    href={resolvedDisabled ? undefined : href}
    aria-disabled={resolvedDisabled ? true : undefined}
    data-disabled={resolvedDisabled ? '' : undefined}
    class={classes}
    {...rest}
  >
    {@render children?.()}
  </a>
{:else}
  <button data-slot="button" {type} disabled={resolvedDisabled} data-disabled={resolvedDisabled ? '' : undefined} class={classes} {...rest}>
    {@render children?.()}
  </button>
{/if}
