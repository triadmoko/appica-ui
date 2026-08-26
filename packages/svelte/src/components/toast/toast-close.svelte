<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  type Props = HTMLButtonAttributes & {
    /**
     * Accessible label for the dismiss control.
     * @default 'Dismiss'
     */
    closeLabel?: string
    children?: Snippet
  }

  let { class: className, closeLabel = 'Dismiss', children, ...rest }: Props = $props()
</script>

<button
  type="button"
  aria-label={closeLabel}
  data-slot="toast-close"
  class={cn(
    'text-foreground-muted -me-1 -mt-1 cursor-pointer self-start rounded-md p-1 outline-none [grid-area:close] motion-safe:transition-colors',
    'hover:text-foreground-intense',
    'focus-visible:ring-ring focus-visible:ring-2',
    className,
  )}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" class="size-4">
      <path
        d="M11.523 3.522c.264-.264.691-.264.955 0s.264.691 0 .955L8.955 8l3.522 3.522c.264.264.264.691 0 .955s-.691.264-.955 0L8 8.955l-3.522 3.522c-.264.264-.691.264-.955 0s-.264-.691 0-.955L7.045 8 3.522 4.478c-.264-.264-.264-.691 0-.955s.691-.264.955 0L8 7.045l3.523-3.522z"
      />
    </svg>
  {/if}
</button>
