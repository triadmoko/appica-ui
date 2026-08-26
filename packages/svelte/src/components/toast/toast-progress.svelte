<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '../../internal/utils'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /** Duration of the countdown animation, in milliseconds. */
    timeout: number
  }

  let { timeout, class: className, ...rest }: Props = $props()
</script>

<div
  data-slot="toast-progress"
  class={cn(
    'pointer-events-none absolute inset-x-0 bottom-0 h-4 overflow-hidden rounded-b-[inherit]',
    'motion-reduce:hidden',
    className,
  )}
  {...rest}
>
  <div
    data-slot="toast-progress-indicator"
    class={cn(
      'bg-primary absolute inset-x-0 bottom-0 h-1 origin-left rtl:origin-right',
      'animate-[toast-progress_linear_forwards]',
      'group-data-expanded/toast:[animation-play-state:paused]',
      'motion-reduce:animate-none',
    )}
    style="animation-duration: {timeout}ms"
  ></div>
</div>
