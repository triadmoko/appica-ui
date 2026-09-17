<script lang="ts">
  import Tabs from './tabs.svelte'
  import TabsList from './tabs-list.svelte'
  import TabsTrigger from './tabs-trigger.svelte'
  import TabsContent from './tabs-content.svelte'

  let {
    locked = false,
    onValueChange,
  }: {
    locked?: boolean
    onValueChange?: (value: string) => void
  } = $props()

  let value = $state('one')

  function handleValueChange(next: string) {
    onValueChange?.(next)
    if (!locked) value = next
  }
</script>

<Tabs {value} onValueChange={handleValueChange}>
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two">Two</TabsTrigger>
    <TabsTrigger value="three">Three</TabsTrigger>
  </TabsList>
  <TabsContent value="one">Panel One</TabsContent>
  <TabsContent value="two">Panel Two</TabsContent>
  <TabsContent value="three">Panel Three</TabsContent>
</Tabs>
