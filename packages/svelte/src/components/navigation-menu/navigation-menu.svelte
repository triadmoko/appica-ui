<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { untrack } from 'svelte'
  import { NavigationMenu as BitsNavigationMenu, type WithoutChildrenOrChild } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { asBitsAttrs, cn, commitBindableChange } from '../../internal/utils'
  import {
    getNavigationMenuInContent,
    setNavigationMenuContext,
    type NavigationMenuIconKind,
    type NavigationMenuOrientation,
    type NavigationMenuSize,
    type NavigationMenuVariant,
  } from './navigation-menu-context'
  import NavigationMenuPositioner from './navigation-menu-positioner.svelte'

  export type NavigationMenuProps = WithoutChildrenOrChild<BitsNavigationMenu.RootProps> & {
    /**
     * Trigger appearance - hover/active pill, or an animated underline.
     * @default 'pill'
     */
    variant?: NavigationMenuVariant
    /**
     * Scales triggers, popup radius, and link padding.
     * @default 'md'
     */
    size?: NavigationMenuSize
    /**
     * The open/close indicator shown by each `NavigationMenuIcon`.
     * @default 'chevron'
     */
    icon?: NavigationMenuIconKind
    /**
     * Render a dimmed, blurred backdrop behind the open panel.
     * @default false
     */
    backdrop?: boolean
    /**
     * Auto-render the portalled positioner + popup. Set `false` to render your own.
     * @default true
     */
    viewport?: boolean
    /**
     * Animate the popup's size and position between items.
     * @default true
     */
    morph?: boolean
    /**
     * Layout of the trigger row.
     * @default 'horizontal'
     */
    orientation?: NavigationMenuOrientation
    /**
     * Gap between the trigger and the auto-rendered popup.
     * @default 6, or 12 when nested inside Content
     */
    sideOffset?: number
    /**
     * Delay in ms before a hover opens a panel.
     * @default 50
     */
    delayDuration?: number
    /** Controlled open item value. */
    value?: string
    /** Uncontrolled initial open item. */
    defaultValue?: string
    /** Fires when the open item changes. */
    onValueChange?: (value: string) => void
    children?: Snippet
  }

  let {
    class: className,
    variant = 'pill',
    size = 'md',
    icon = 'chevron',
    backdrop = false,
    viewport = true,
    morph = true,
    orientation = 'horizontal',
    sideOffset,
    delayDuration = 50,
    value = $bindable(),
    defaultValue = '',
    onValueChange,
    children,
    ...rest
  }: NavigationMenuProps = $props()

  const direction = useDirection()
  const nested = getNavigationMenuInContent()
  const resolvedSideOffset = $derived(sideOffset ?? (nested ? 12 : 6))

  let rootEl = $state<HTMLElement | null>(null)
  let innerValue = $state('')
  innerValue = untrack(() => value ?? defaultValue)

  $effect(() => {
    if (value === undefined) return
    innerValue = value
  })

  function handleValueChange(next: string) {
    commitBindableChange({
      next,
      bound: value,
      setBound: (nextValue) => {
        value = nextValue
      },
      setInner: (nextValue) => {
        innerValue = nextValue
      },
      onChange: onValueChange,
    })
  }

  setNavigationMenuContext({
    get variant() {
      return variant
    },
    get size() {
      return size
    },
    get icon() {
      return icon
    },
    get orientation() {
      return orientation
    },
    get backdrop() {
      return backdrop
    },
    get morph() {
      return morph
    },
    get sideOffset() {
      return resolvedSideOffset
    },
    isOpen: () => innerValue !== '',
    rootEl: () => rootEl,
  })
</script>

{#if nested}
  <BitsNavigationMenu.Sub
    bind:ref={rootEl}
    data-slot="navigation-menu"
    data-orientation={orientation}
    {orientation}
    bind:value={innerValue}
    onValueChange={handleValueChange}
    class={cn(className)}
    {...asBitsAttrs(rest)}
  >
    {#if viewport}
      <NavigationMenuPositioner sideOffset={resolvedSideOffset} />
    {/if}
    {@render children?.()}
  </BitsNavigationMenu.Sub>
{:else}
  <BitsNavigationMenu.Root
    bind:ref={rootEl}
    data-slot="navigation-menu"
    data-orientation={orientation}
    {orientation}
    delayDuration={delayDuration}
    dir={direction.current}
    bind:value={innerValue}
    onValueChange={handleValueChange}
    class={cn(className)}
    {...asBitsAttrs(rest)}
  >
    {#if viewport}
      <NavigationMenuPositioner sideOffset={resolvedSideOffset} />
    {/if}
    {@render children?.()}
  </BitsNavigationMenu.Root>
{/if}
