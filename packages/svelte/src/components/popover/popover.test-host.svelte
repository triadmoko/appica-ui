<script lang="ts">
  import { DirectionProvider } from '../../providers/direction-provider'
  import type { Direction } from '../../providers/direction-provider/direction-context'
  import { buttonVariants } from '../button/button-variants'
  import Popover from './popover.svelte'
  import PopoverTrigger from './popover-trigger.svelte'
  import PopoverContent from './popover-content.svelte'
  import PopoverTitle from './popover-title.svelte'
  import PopoverDescription from './popover-description.svelte'
  import PopoverClose from './popover-close.svelte'

  let {
    title = 'Notifications',
    description = 'You are all caught up.',
    arrow = true,
    keepMounted = false,
    openOnHover = false,
    delay = 0,
    dir,
  }: {
    title?: string
    description?: string
    arrow?: boolean
    keepMounted?: boolean
    openOnHover?: boolean
    delay?: number
    dir?: Direction
  } = $props()
</script>

{#snippet tree()}
  <button type="button">Outside</button>
  <Popover>
    <PopoverTrigger class={buttonVariants({ variant: 'outline' })} {openOnHover} {delay}>Open</PopoverTrigger>
    <PopoverContent {arrow} {keepMounted}>
      <PopoverTitle>{title}</PopoverTitle>
      <PopoverDescription>{description}</PopoverDescription>
      <PopoverClose class={buttonVariants({ variant: 'primary', size: 'sm' })}>Dismiss</PopoverClose>
    </PopoverContent>
  </Popover>
{/snippet}

{#if dir}
  <DirectionProvider {dir}>
    {@render tree()}
  </DirectionProvider>
{:else}
  {@render tree()}
{/if}
