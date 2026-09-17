<script lang="ts">
  import Tabs from './tabs.svelte'
  import TabsList from './tabs-list.svelte'
  import TabsTrigger from './tabs-trigger.svelte'
  import TabsContent from './tabs-content.svelte'
  import type { TabsListVariant, TabsOrientation, TabsSize } from './tabs-variants'

  let {
    defaultValue = 'one',
    value,
    onValueChange,
    secondDisabled,
    variant,
    size,
    orientation,
    keepMounted,
    activateOnFocus,
  }: {
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    secondDisabled?: boolean
    variant?: TabsListVariant
    size?: TabsSize
    orientation?: TabsOrientation
    keepMounted?: boolean
    activateOnFocus?: boolean
  } = $props()
</script>

<Tabs {defaultValue} {value} {onValueChange} {variant} {size} {orientation} {activateOnFocus}>
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two" disabled={secondDisabled}>Two</TabsTrigger>
    <TabsTrigger value="three">Three</TabsTrigger>
  </TabsList>
  <TabsContent value="one" {keepMounted}>Panel One</TabsContent>
  <TabsContent value="two" {keepMounted}>Panel Two</TabsContent>
  <TabsContent value="three" {keepMounted}>Panel Three</TabsContent>
</Tabs>
