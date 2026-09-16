<script lang="ts">
  import { buttonVariants } from '../button/button-variants'
  import { DirectionProvider } from '../../providers/direction-provider'
  import type { Direction } from '../../providers/direction-provider/direction-context'
  import Tooltip from './tooltip.svelte'
  import TooltipTrigger from './tooltip-trigger.svelte'
  import TooltipContent from './tooltip-content.svelte'
  import TooltipProvider from './tooltip-provider.svelte'

  let {
    delay = 0,
    arrow = true,
    content = 'Add to library',
    disabled = false,
    disableHoverablePopup = false,
    trackCursorAxis = 'none',
    dir,
  }: {
    delay?: number
    arrow?: boolean
    content?: string
    disabled?: boolean
    disableHoverablePopup?: boolean
    trackCursorAxis?: 'none' | 'x' | 'y' | 'both'
    dir?: Direction
  } = $props()
</script>

{#snippet tree()}
  <TooltipProvider {delay}>
    <Tooltip {disabled} {disableHoverablePopup} {trackCursorAxis}>
      <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>Hover</TooltipTrigger>
      <TooltipContent {arrow}>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
{/snippet}

{#if dir}
  <DirectionProvider {dir}>
    {@render tree()}
  </DirectionProvider>
{:else}
  {@render tree()}
{/if}
