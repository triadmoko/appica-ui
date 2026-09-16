<script lang="ts">
  import type { Snippet } from 'svelte'
  import { setDrawerProviderContext } from './drawer-context'

  type Props = { children?: Snippet }

  let { children }: Props = $props()

  let openCount = $state(0)
  let swipeProgress = $state(0)

  setDrawerProviderContext({
    get openCount() {
      return openCount
    },
    get swipeProgress() {
      return swipeProgress
    },
    incrementOpen() {
      openCount += 1
    },
    decrementOpen() {
      openCount = Math.max(0, openCount - 1)
      if (openCount === 0) swipeProgress = 0
    },
    setSwipeProgress(progress) {
      swipeProgress = progress
    },
  })
</script>

{@render children?.()}
