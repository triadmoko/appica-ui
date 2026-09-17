<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Collapsible as BitsCollapsible } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Keep the panel in the DOM while closed so find-in-page and search-engine crawlers can still reach the hidden text.
     * @default false
     */
    keepMounted?: boolean
    /**
     * Use the native `hidden="until-found"` so closed text stays findable.
     * @default false
     */
    hiddenUntilFound?: boolean
    children?: Snippet
  }

  let { class: className, keepMounted = false, hiddenUntilFound = false, children, ...rest }: Props = $props()

  const persist = $derived(keepMounted || hiddenUntilFound)
  const classes = $derived(
    cn(
      'overflow-hidden',
      'h-(--collapsible-panel-height)',
      'data-[state=closed]:h-0',
      'data-ending-style:h-0 data-starting-style:h-0',
      'transition-[height] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
      'motion-reduce:transition-none',
      className,
    ),
  )

  function contentStyle(propsStyle: unknown) {
    const alias = '--collapsible-panel-height: var(--bits-collapsible-content-height)'
    if (typeof propsStyle === 'string' && propsStyle.length > 0) {
      return `${alias}; ${propsStyle}`
    }
    return alias
  }
</script>

<BitsCollapsible.Content
  data-slot="collapsible-content"
  class={classes}
  forceMount={persist ? true : undefined}
  hiddenUntilFound={hiddenUntilFound ? true : undefined}
  {...asBitsAttrs(rest)}
>
  {#snippet child({ props, open })}
    {#if persist || !props.hidden}
      <div
        {...props}
        data-slot="collapsible-content"
        data-open={open ? '' : undefined}
        data-closed={open ? undefined : ''}
        style={contentStyle(props.style)}
      >
        {@render children?.()}
      </div>
    {/if}
  {/snippet}
</BitsCollapsible.Content>
