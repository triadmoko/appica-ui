<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { onMount, untrack } from 'svelte'
  import { cn } from '../../internal/utils'
  import { getToastViewContext } from './toast-position'
  import { toastShellClass, toastSizeClass, toastSurfaceClass } from './toast-variants'
  import { useToastManager, type ToastData, type ToastPosition } from './toast-manager.svelte'
  import ToastClose from './toast-close.svelte'
  import ToastProgress from './toast-progress.svelte'

  type Props = HTMLAttributes<HTMLDivElement> & {
    toast: ToastData
    position?: ToastPosition
    /**
     * Show the dismiss button.
     * @default true
     */
    dismissible?: boolean
    /**
     * Opt in to a countdown progress bar.
     * @default false
     */
    progress?: boolean
    /**
     * Provider default timeout used when the toast omits `timeout`.
     * @default 5000
     */
    providerTimeout?: number
    /**
     * Accessible label for the close button.
     * @default 'Dismiss'
     */
    closeLabel?: string
    index?: number
    ownHeight?: number
    frontmostHeight?: number
    offsetY?: number
    onHeight?: (height: number) => void
    children?: Snippet
  }

  let {
    class: className,
    toast,
    position: positionProp,
    dismissible = true,
    progress = false,
    providerTimeout = 5000,
    closeLabel,
    index = 0,
    ownHeight = 0,
    frontmostHeight = 0,
    offsetY = 0,
    onHeight,
    children,
    ...rest
  }: Props = $props()

  const manager = useToastManager()
  const view = getToastViewContext()
  const position = $derived(positionProp ?? view.position)
  const resolvedTimeout = $derived(toast.timeout ?? providerTimeout)
  const showProgress = $derived(progress && resolvedTimeout > 0)
  const sized = $derived(ownHeight > 0)
  const classes = $derived(cn(toastShellClass(position, className), sized && toastSizeClass))
  const surface = $derived(toastSurfaceClass(position))
  const resolvedFront = $derived(frontmostHeight > 0 ? frontmostHeight : ownHeight)

  let enterPhase = $state<'starting' | 'open'>('starting')

  onMount(() => {
    const open = () => {
      enterPhase = 'open'
    }
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(open)
    })
    const fallback = window.setTimeout(open, 50)
    return () => {
      window.clearTimeout(fallback)
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  })
</script>

<div
  data-slot="toast"
  data-position={position}
  data-stacked={index > 0 ? '' : undefined}
  data-expanded={view.expanded ? '' : undefined}
  data-starting-style={enterPhase === 'starting' && !toast.closing ? '' : undefined}
  data-ending-style={toast.closing ? '' : undefined}
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class={classes}
  style="--toast-index: {index}; --toast-height: {ownHeight}px; --toast-frontmost-height: {resolvedFront}px; --toast-offset-y: {offsetY}px; --toast-swipe-movement-x: 0px; --toast-swipe-movement-y: 0px;"
  {...rest}
>
  <div
    class={surface}
    {@attach (node) => {
      const report = untrack(() => onHeight)
      if (!report) return
      const publish = () => report(Math.round(node.getBoundingClientRect().height))
      const observer = new ResizeObserver(publish)
      observer.observe(node)
      publish()
      return () => observer.disconnect()
    }}
  >
    {@render children?.()}
    {#if dismissible}
      <ToastClose {closeLabel} onclick={() => manager.close(toast.id)} />
    {/if}
    {#if showProgress}
      {#key `${toast.id}-${resolvedTimeout}`}
        <ToastProgress timeout={resolvedTimeout} />
      {/key}
    {/if}
  </div>
</div>
