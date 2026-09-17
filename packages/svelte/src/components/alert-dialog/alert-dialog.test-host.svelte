<script lang="ts">
  import { buttonVariants } from '../button/button-variants'
  import type { OverlayHandle } from '../../internal/overlay-handle.svelte'
  import Dialog from '../dialog/dialog.svelte'
  import DialogTrigger from '../dialog/dialog-trigger.svelte'
  import DialogContent from '../dialog/dialog-content.svelte'
  import DialogHeader from '../dialog/dialog-header.svelte'
  import DialogTitle from '../dialog/dialog-title.svelte'
  import DialogDescription from '../dialog/dialog-description.svelte'
  import DialogBody from '../dialog/dialog-body.svelte'
  import AlertDialog from './alert-dialog.svelte'
  import AlertDialogTrigger from './alert-dialog-trigger.svelte'
  import AlertDialogContent from './alert-dialog-content.svelte'
  import AlertDialogHeader from './alert-dialog-header.svelte'
  import AlertDialogTitle from './alert-dialog-title.svelte'
  import AlertDialogDescription from './alert-dialog-description.svelte'
  import AlertDialogBody from './alert-dialog-body.svelte'
  import AlertDialogFooter from './alert-dialog-footer.svelte'
  import AlertDialogClose from './alert-dialog-close.svelte'

  let {
    handle,
    backdrop,
    frame,
    contentClass,
    nested,
  }: {
    handle?: OverlayHandle
    backdrop?: boolean
    frame?: boolean
    contentClass?: string
    nested?: boolean
  } = $props()
</script>

{#snippet alert()}
  <AlertDialog {handle}>
    <AlertDialogTrigger class={buttonVariants({ variant: 'destructive' })}>Delete</AlertDialogTrigger>
    <AlertDialogContent class={contentClass} {backdrop} {frame}>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete project</AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogBody>Everything in this project will be removed.</AlertDialogBody>
      <AlertDialogFooter>
        <AlertDialogClose class={buttonVariants({ variant: 'outline' })}>Cancel</AlertDialogClose>
        <AlertDialogClose class={buttonVariants({ variant: 'destructive' })}>Confirm</AlertDialogClose>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
{/snippet}

{#if nested}
  <Dialog>
    <DialogTrigger class={buttonVariants()}>Open dialog</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit post</DialogTitle>
        <DialogDescription>Unsaved edits stay in this dialog.</DialogDescription>
      </DialogHeader>
      <DialogBody>Nested body</DialogBody>
      {@render alert()}
    </DialogContent>
  </Dialog>
{:else}
  {@render alert()}
{/if}
