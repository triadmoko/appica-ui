<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '../../internal/utils'
  import { useReducedMotion } from '../../hooks/use-reduced-motion/use-reduced-motion'

  type SpinnerVariant = 'circular' | 'dots' | 'sparkle'

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    /**
     * The animated shape.
     * @default 'circular'
     */
    variant?: SpinnerVariant
    /**
     * Inherit the surrounding text color (`currentColor`) instead of the primary accent.
     * @default false
     */
    currentColor?: boolean
  }

  let {
    variant = 'circular',
    currentColor = false,
    'aria-label': ariaLabel = 'Loading',
    class: className,
    ...rest
  }: Props = $props()

  const reduced = useReducedMotion()
  const colors = $derived(
    currentColor
      ? { indicator: 'text-current', track: 'text-current/20' }
      : { indicator: 'text-primary', track: 'text-primary-soft' },
  )

  const DOT_COUNT = 12
  const SPARKLE_PATH =
    'M12.846 3.581C12.711 3.231 12.375 3 12 3C11.625 3 11.278 3.263 11.154 3.581C10.604 5.011 10.054 6.442 9.504 7.872C8.752 8.16 8.159 8.752 7.871 9.504C6.441 10.054 5.011 10.604 3.581 11.154C3.41 11.22 3.263 11.336 3.159 11.487C3.055 11.638 3 11.817 3 12C3 12.183 3.056 12.362 3.159 12.513C3.262 12.664 3.41 12.78 3.581 12.846C5.011 13.396 6.442 13.946 7.872 14.496C8.16 15.248 8.752 15.841 9.504 16.129C10.054 17.559 10.604 18.989 11.154 20.419C11.22 20.59 11.336 20.737 11.487 20.841C11.638 20.945 11.817 21 12 21C12.183 21 12.362 20.945 12.513 20.841C12.664 20.737 12.78 20.59 12.846 20.419C13.396 18.989 13.946 17.559 14.496 16.129C15.248 15.841 15.841 15.248 16.129 14.496C17.559 13.946 18.989 13.396 20.419 12.846C20.59 12.78 20.737 12.664 20.841 12.513C20.945 12.362 21 12.183 21 12C21 11.817 20.945 11.638 20.841 11.487C20.737 11.336 20.59 11.22 20.419 11.154C18.989 10.604 17.559 10.054 16.129 9.504C15.841 8.752 15.248 8.16 14.496 7.871C13.946 6.441 13.396 5.011 12.846 3.581Z'
</script>

<span
  data-slot="spinner"
  role="status"
  aria-label={ariaLabel}
  class={cn('inline-flex shrink-0 items-center justify-center align-middle text-[2.5rem]', className)}
  {...rest}
>
  {#if variant === 'circular'}
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="round"
      aria-hidden="true"
      class={cn('size-[1em] stroke-4!', colors.indicator)}
    >
      <circle cx="20" cy="20" r="16" class={colors.track}></circle>
      <circle
        cx="20"
        cy="20"
        r="16"
        pathLength="1"
        stroke-dasharray="0.25 0.75"
        class={reduced.current ? undefined : 'appica-spinner-circular'}
      ></circle>
    </svg>
  {:else if variant === 'dots'}
    <svg width="1em" height="1em" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true" class={cn('size-[1em]', colors.indicator)}>
      {#each Array.from({ length: DOT_COUNT }, (_, i) => i) as i (i)}
        <rect
          x="18"
          y="2"
          width="4"
          height="6"
          rx="2"
          transform="rotate({i * (360 / DOT_COUNT)} 20 20)"
          opacity={reduced.current ? 0.25 : undefined}
          class={reduced.current ? undefined : 'appica-spinner-dot'}
          style={reduced.current ? undefined : `animation-delay: ${(i / DOT_COUNT) * 1.2 - 1.2}s`}
        ></rect>
      {/each}
    </svg>
  {:else}
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
      aria-hidden="true"
      class={cn('size-[1em]', colors.indicator, reduced.current ? undefined : 'appica-spinner-sparkle')}
    >
      <path d={SPARKLE_PATH}></path>
    </svg>
  {/if}
</span>

<style>
  .appica-spinner-circular {
    animation: appica-spinner-dash 0.9s linear infinite;
  }
  .appica-spinner-dot {
    animation: appica-spinner-dot 1.2s linear infinite;
  }
  .appica-spinner-sparkle {
    transform-origin: 12px 12px;
    animation: appica-spinner-spin 2.5s linear infinite;
  }
  @keyframes appica-spinner-dash {
    to {
      stroke-dashoffset: -1;
    }
  }
  @keyframes appica-spinner-dot {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes appica-spinner-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .appica-spinner-circular,
    .appica-spinner-dot,
    .appica-spinner-sparkle {
      animation: none;
    }
  }
</style>
