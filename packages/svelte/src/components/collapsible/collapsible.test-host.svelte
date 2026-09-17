<script lang="ts">
  import Collapsible from './collapsible.svelte'
  import CollapsibleTrigger from './collapsible-trigger.svelte'
  import CollapsibleContent from './collapsible-content.svelte'

  let {
    defaultOpen,
    disabled,
    keepMounted,
    hiddenUntilFound,
    rootClass,
    triggerClass,
    contentClass,
  }: {
    defaultOpen?: boolean
    disabled?: boolean
    keepMounted?: boolean
    hiddenUntilFound?: boolean
    rootClass?: string
    triggerClass?: string
    contentClass?: string
  } = $props()
</script>

<Collapsible {defaultOpen} {disabled} class={rootClass}>
  <CollapsibleTrigger class={triggerClass}>Toggle</CollapsibleTrigger>
  <CollapsibleContent {keepMounted} {hiddenUntilFound} class={contentClass}>
    <p>Panel body</p>
  </CollapsibleContent>
</Collapsible>
