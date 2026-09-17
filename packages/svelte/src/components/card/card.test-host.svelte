<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import Card from './card.svelte'
  import CardDescription from './card-description.svelte'
  import CardFooter from './card-footer.svelte'
  import CardHeader from './card-header.svelte'
  import CardMedia from './card-media.svelte'
  import CardTitle from './card-title.svelte'

  let {
    frame = false,
    inset = true,
    el = 'div',
    class: className,
    contentProps,
    titleEl = 'h3',
  }: {
    frame?: boolean | 'solid' | 'glass'
    inset?: boolean
    el?: 'div' | 'article' | 'li' | 'section' | 'aside' | 'form'
    class?: string
    contentProps?: HTMLAttributes<HTMLDivElement>
    titleEl?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  } = $props()
</script>

<Card {frame} {inset} {el} class={className} {contentProps}>
  <CardMedia>
    <img alt="" src="https://example.com/cover.jpg" />
  </CardMedia>
  <CardHeader>
    <CardTitle el={titleEl}>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardFooter>
    <span>Footer</span>
  </CardFooter>
</Card>
