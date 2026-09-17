<script lang="ts">
  import type { HTMLAttributes, HTMLFormAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'

  const CARD_RADIUS = '[--card-radius:var(--radius-xl)]'
  const FRAME_RADIUS = 'rounded-[calc(var(--card-radius)*4/3)]'

  type CardFrame = 'none' | 'solid' | 'glass'
  type CardEl = 'div' | 'article' | 'li' | 'section' | 'aside' | 'form'

  const frameVariants: Record<CardFrame, string> = {
    none: 'rounded-(--card-radius)',
    solid: `${FRAME_RADIUS} bg-background-subtle p-2 backdrop-blur-md`,
    glass: `${FRAME_RADIUS} border border-white/15 bg-white/10 p-2 backdrop-blur-sm`,
  }

  const contentFrameVariants: Record<CardFrame, string> = {
    none: 'border',
    solid: 'border-border-muted border',
    glass: '',
  }

  export type CardProps = HTMLAttributes<HTMLElement> &
    Pick<HTMLFormAttributes, 'onsubmit' | 'action' | 'method' | 'novalidate'> & {
    /**
     * Wrap the content in a padded frame. `true` is an alias for `'solid'`; `'glass'` is translucent and blurred.
     * @default false
     */
    frame?: boolean | 'solid' | 'glass'
    /**
     * Float the slots inside the content, so media rounds all four corners. `false` gives edge-to-edge media.
     * @default true
     */
    inset?: boolean
    /**
     * Root tag.
     * @default 'div'
     */
    el?: CardEl
    /** Escape hatch for the inner content wrapper - e.g. `{ class: 'sm:flex-row' }` for a horizontal card. */
    contentProps?: HTMLAttributes<HTMLDivElement>
    children?: Snippet
  }

  let {
    frame = false,
    inset = true,
    el = 'div',
    class: className,
    contentProps,
    children,
    ...rest
  }: CardProps = $props()

  const variant: CardFrame = $derived(frame === true ? 'solid' : frame === false ? 'none' : frame)
</script>

<svelte:element
  this={el}
  data-slot="card"
  data-frame={variant}
  data-inset={inset ? '' : undefined}
  class={cn('group/card flex flex-col', CARD_RADIUS, frameVariants[variant], className)}
  {...rest}
>
  <div
    data-slot="card-content"
    {...contentProps}
    class={cn(
      'bg-background flex min-h-0 flex-1 flex-col overflow-hidden rounded-(--card-radius)',
      inset && 'p-2',
      contentFrameVariants[variant],
      contentProps?.class,
    )}
  >
    {@render children?.()}
  </div>
</svelte:element>
