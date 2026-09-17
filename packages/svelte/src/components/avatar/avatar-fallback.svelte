<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { getAvatarContext } from './avatar-context'

  export type AvatarFallbackProps = HTMLAttributes<HTMLSpanElement> & {
    /**
     * Milliseconds to wait before showing the fallback (avoids a flash on fast loads).
     */
    delay?: number
    children?: Snippet
  }

  let { class: className, children, delay, ...rest }: AvatarFallbackProps = $props()

  const avatar = getAvatarContext()
  let delayElapsed = $state(true)

  $effect.pre(() => {
    const ms = delay
    if (ms == null || ms <= 0) {
      delayElapsed = true
    } else {
      delayElapsed = false
    }
  })

  $effect(() => {
    const ms = delay
    if (ms == null || ms <= 0) return
    const id = setTimeout(() => {
      delayElapsed = true
    }, ms)
    return () => clearTimeout(id)
  })

  const show = $derived((!avatar || avatar.status !== 'loaded') && delayElapsed)
</script>

{#if show}
  <span
    data-slot="avatar-fallback"
    class={cn(
      'flex size-full items-center justify-center rounded-[inherit] text-[0.4em] leading-none uppercase has-[svg]:text-[1em]',
      className,
    )}
    {...rest}
  >
    {@render children?.()}
  </span>
{/if}
