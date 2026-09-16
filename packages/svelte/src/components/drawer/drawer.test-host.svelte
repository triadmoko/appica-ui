<script lang="ts">
  import { buttonVariants } from '../button/button-variants'
  import type { OverlayHandle } from '../../internal/overlay-handle.svelte'
  import type { DrawerSide, DrawerSnapPoint } from './drawer-context'
  import Drawer from './drawer.svelte'
  import DrawerTrigger from './drawer-trigger.svelte'
  import DrawerContent from './drawer-content.svelte'
  import DrawerHeader from './drawer-header.svelte'
  import DrawerTitle from './drawer-title.svelte'
  import DrawerDescription from './drawer-description.svelte'
  import DrawerBody from './drawer-body.svelte'
  import DrawerFooter from './drawer-footer.svelte'
  import DrawerClose from './drawer-close.svelte'
  import { DirectionProvider } from '../../providers/direction-provider'

  let {
    side,
    closeButton,
    backdrop,
    frame,
    nested,
    handle,
    contentClass,
    snapPoints,
    dir,
    disablePointerDismissal,
  }: {
    side?: DrawerSide
    closeButton?: boolean
    backdrop?: boolean
    frame?: boolean
    nested?: boolean
    handle?: OverlayHandle
    contentClass?: string
    snapPoints?: DrawerSnapPoint[]
    dir?: 'ltr' | 'rtl'
    disablePointerDismissal?: boolean
  } = $props()
</script>

{#snippet panel()}
  <Drawer {side} {handle} {snapPoints} {disablePointerDismissal}>
    <DrawerTrigger class={buttonVariants()}>Open drawer</DrawerTrigger>
    <DrawerContent {closeButton} {backdrop} {frame} class={contentClass} {dir}>
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>Update your details below.</DrawerDescription>
      </DrawerHeader>
      <DrawerBody>Body content</DrawerBody>
      <DrawerFooter>
        <DrawerClose class={buttonVariants({ variant: 'outline' })}>Cancel</DrawerClose>
      </DrawerFooter>
      {#if nested}
        <Drawer>
          <DrawerTrigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>Nested</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Nested</DrawerTitle>
              <DrawerDescription>Inner drawer</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>Nested body</DrawerBody>
          </DrawerContent>
        </Drawer>
      {/if}
    </DrawerContent>
  </Drawer>
{/snippet}

{#if dir}
  <DirectionProvider {dir}>
    {@render panel()}
  </DirectionProvider>
{:else}
  {@render panel()}
{/if}
