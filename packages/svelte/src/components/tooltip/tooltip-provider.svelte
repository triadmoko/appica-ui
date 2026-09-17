<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Tooltip as BitsTooltip, type WithoutChildrenOrChild } from 'bits-ui'

  export type TooltipProviderProps = Omit<
    WithoutChildrenOrChild<BitsTooltip.ProviderProps>,
    'delayDuration' | 'skipDelayDuration'
  > & {
    /**
     * Delay in milliseconds before a tooltip opens.
     * @default 200
     */
    delay?: number
    /**
     * Window after a tooltip closes during which the next one opens instantly (no delay).
     * @default 400
     */
    timeout?: number
    children?: Snippet
  }

  let { delay = 200, timeout = 400, children }: TooltipProviderProps = $props()
</script>

<BitsTooltip.Provider delayDuration={delay} skipDelayDuration={timeout}>
  {@render children?.()}
</BitsTooltip.Provider>
