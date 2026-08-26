<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import type { VariantProps } from 'class-variance-authority'
  import { cn } from '../../internal/utils'
  import { buttonVariants } from '../button/button-variants'

  type Props = HTMLButtonAttributes & {
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    children?: Snippet
  }

  let { class: className, variant = 'primary', size = 'sm', children, ...rest }: Props = $props()
</script>

<button type="button" data-slot="toast-action" class={cn(buttonVariants({ variant, size }), className)} {...rest}>
  {@render children?.()}
</button>
