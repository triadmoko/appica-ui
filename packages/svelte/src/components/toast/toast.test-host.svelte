<script lang="ts">
  import ToastProvider from './toast-provider.svelte'
  import Toaster from './toaster.svelte'
  import ToastTrigger from './toast.test-trigger.svelte'
  import type { ToastPosition } from './toast-manager.svelte'

  let {
    title = 'Hello',
    description = 'World',
    timeout,
    position,
    progress,
    withAction,
    icon,
    thumbnail,
    toastProgress,
    withPromise,
  }: {
    title?: string
    description?: string
    timeout?: number
    position?: ToastPosition
    progress?: boolean
    withAction?: boolean
    icon?: string
    thumbnail?: string
    toastProgress?: boolean
    withPromise?: boolean
  } = $props()
</script>

<ToastProvider>
  <ToastTrigger {title} {description} {timeout} {withAction} {icon} {thumbnail} {toastProgress} {withPromise} />
  <Toaster {position} {progress} />
</ToastProvider>
