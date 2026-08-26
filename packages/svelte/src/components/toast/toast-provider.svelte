<script lang="ts">
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { createToastManager, setToastManager, type ToastManager } from './toast-manager.svelte'

  type Props = {
    /**
     * Existing manager. Created automatically when omitted.
     */
    manager?: ToastManager
    /**
     * Default auto-dismiss duration in milliseconds. `0` disables auto-dismiss.
     * @default 5000
     */
    timeout?: number
    /**
     * Maximum number of toasts shown at once. Older toasts stay mounted with `data-limited`.
     * @default 3
     */
    limit?: number
    children?: Snippet
  }

  let { manager, timeout = 5000, limit = 3, children }: Props = $props()

  const fallback = createToastManager()
  const active = untrack(() => manager ?? fallback)
  setToastManager(active)

  $effect(() => {
    active.configure({ timeout, limit })
  })
</script>

{@render children?.()}
