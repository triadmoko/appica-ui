<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import Thumbnail from '../thumbnail/thumbnail.svelte'
  import { useToastManager, type ToastPosition } from './toast-manager.svelte'
  import ToastPortal from './toast-portal.svelte'
  import ToastViewport from './toast-viewport.svelte'
  import Toast from './toast.svelte'
  import ToastIcon from './toast-icon.svelte'
  import ToastTitle from './toast-title.svelte'
  import ToastDescription from './toast-description.svelte'
  import ToastActions from './toast-actions.svelte'
  import ToastAction from './toast-action.svelte'
  import ToastStatusIcon from './toast-status-icon.svelte'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Where the stack is anchored; also sets the default swipe-to-dismiss directions.
     * @default 'bottom-right'
     */
    position?: ToastPosition
    /**
     * Opt in to a countdown progress bar on auto-dismissing toasts. Individual toasts can
     * override this with `progress` on `add()`.
     * @default false
     */
    progress?: boolean
    /**
     * Provider default (ms) used to size the progress bar for toasts that don't set their own `timeout`.
     * @default 5000
     */
    timeout?: number
    /**
     * Portal target - scope the toasts to a specific element.
     * @default document.body
     */
    container?: Element | string
  }

  let {
    position = 'bottom-right',
    progress = false,
    timeout = 5000,
    class: className,
    container,
    ...rest
  }: Props = $props()

  const manager = useToastManager()
  let heights = $state<Record<string, number>>({})

  function setHeight(id: string, next: number) {
    if (heights[id] === next) return
    heights[id] = next
  }

  $effect(() => {
    const live = new Set(manager.toasts.map((toast) => toast.id))
    for (const id of Object.keys(heights)) {
      if (!live.has(id)) delete heights[id]
    }
  })

  function offsetY(index: number) {
    let sum = 0
    for (let i = 0; i < index; i++) {
      const id = manager.toasts[i]?.id
      if (id) sum += heights[id] ?? 0
    }
    return sum
  }

  const stackHeight = $derived.by(() => {
    const list = manager.toasts
    if (list.length === 0) return 0
    const measured = list.map((toast) => heights[toast.id] ?? 0)
    const front = measured[0] ?? 0
    const extra = Math.max(0, list.length - 1) * 12
    const collapsed = front + extra
    const expanded = measured.reduce((sum, value) => sum + value, 0) + extra
    return Math.max(collapsed, expanded)
  })
</script>

<ToastPortal to={container}>
  <ToastViewport {position} class={className} style="min-height: {stackHeight}px" {...rest}>
    {#each manager.toasts as toast, index (toast.id)}
      <Toast
        {toast}
        {position}
        progress={toast.progress ?? progress}
        providerTimeout={timeout}
        {index}
        ownHeight={heights[toast.id] ?? 0}
        frontmostHeight={manager.toasts[0] ? (heights[manager.toasts[0].id] ?? 0) : 0}
        offsetY={offsetY(index)}
        onHeight={(height) => setHeight(toast.id, height)}
      >
        {#if toast.data?.thumbnail}
          <ToastIcon>
            <Thumbnail size="sm" src={toast.data.thumbnail} alt={toast.data.thumbnailAlt ?? ''} />
          </ToastIcon>
        {:else if toast.data?.icon}
          <ToastIcon>
            <ToastStatusIcon kind={toast.data.icon} />
          </ToastIcon>
        {/if}
        {#if toast.title}
          <ToastTitle>{toast.title}</ToastTitle>
        {/if}
        {#if toast.description}
          <ToastDescription>{toast.description}</ToastDescription>
        {/if}
        {#if toast.actionProps}
          <ToastActions>
            <ToastAction onclick={toast.actionProps.onclick}>{toast.actionProps.children}</ToastAction>
          </ToastActions>
        {/if}
      </Toast>
    {/each}
  </ToastViewport>
</ToastPortal>
