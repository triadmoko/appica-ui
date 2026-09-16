<script lang="ts">
  import { buttonVariants } from '../button/button-variants'
  import Toolbar from '../toolbar/toolbar.svelte'
  import Tooltip from './tooltip.svelte'
  import TooltipTrigger from './tooltip-trigger.svelte'
  import TooltipContent from './tooltip-content.svelte'
  import TooltipProvider from './tooltip-provider.svelte'
</script>

<TooltipProvider delay={0}>
  <Toolbar aria-label="Text formatting">
    <Tooltip>
      <TooltipTrigger class={buttonVariants({ variant: 'ghost', size: 'icon-md' })}>Bold</TooltipTrigger>
      <TooltipContent>Bold</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger class={buttonVariants({ variant: 'ghost', size: 'icon-md' })}>Italic</TooltipTrigger>
      <TooltipContent>Italic</TooltipContent>
    </Tooltip>
  </Toolbar>
</TooltipProvider>
