<script lang="ts">
  import type { Snippet } from 'svelte'
  import { createToastManager, setToastManager, type ToastManager } from './toast-manager.svelte'

  type Props = {
    /** Existing manager. Created automatically when omitted. */
    manager?: ToastManager
    children?: Snippet
  }

  let { manager, children }: Props = $props()

  const fallback = createToastManager()
  setToastManager({
    get toasts() {
      return (manager ?? fallback).toasts
    },
    add(options) {
      return (manager ?? fallback).add(options)
    },
    close(id) {
      ;(manager ?? fallback).close(id)
    },
    remove(id) {
      ;(manager ?? fallback).remove(id)
    },
    update(id, options) {
      ;(manager ?? fallback).update(id, options)
    },
    promise(work, messages) {
      return (manager ?? fallback).promise(work, messages)
    },
  })
</script>

{@render children?.()}
