<script lang="ts">
  import { DirectionProvider } from '../../providers/direction-provider'
  import type { Direction } from '../../providers/direction-provider/direction-context'
  import PreviewCard from './preview-card.svelte'
  import PreviewCardTrigger from './preview-card-trigger.svelte'
  import PreviewCardContent from './preview-card-content.svelte'

  let {
    body = 'A short preview of the linked page.',
    arrow = true,
    keepMounted = false,
    dir,
  }: {
    body?: string
    arrow?: boolean
    keepMounted?: boolean
    dir?: Direction
  } = $props()
</script>

{#snippet tree()}
  <PreviewCard openDelay={0} closeDelay={0}>
    <PreviewCardTrigger href="https://example.com">example.com</PreviewCardTrigger>
    <PreviewCardContent {arrow} {keepMounted}>
      <p>{body}</p>
    </PreviewCardContent>
  </PreviewCard>
{/snippet}

{#if dir}
  <DirectionProvider {dir}>
    {@render tree()}
  </DirectionProvider>
{:else}
  {@render tree()}
{/if}
