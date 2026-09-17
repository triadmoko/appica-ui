<script lang="ts">
  import { untrack } from 'svelte'
  import Accordion from './accordion.svelte'
  import AccordionItem from './accordion-item.svelte'
  import AccordionTrigger from './accordion-trigger.svelte'
  import AccordionContent from './accordion-content.svelte'

  let {
    locked = false,
    multiple = false,
    onValueChange,
  }: {
    locked?: boolean
    multiple?: boolean
    onValueChange?: (value: string | string[]) => void
  } = $props()

  let value = $state<string | string[]>(untrack(() => (multiple ? [] : '')))

  function handleValueChange(next: string | string[]) {
    onValueChange?.(next)
    if (!locked) value = next
  }
</script>

<Accordion {value} {multiple} onValueChange={handleValueChange}>
  <AccordionItem value="one">
    <AccordionTrigger>Toggle</AccordionTrigger>
    <AccordionContent>
      <p>Panel body</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="two">
    <AccordionTrigger>Second</AccordionTrigger>
    <AccordionContent>
      <p>Second body</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>
