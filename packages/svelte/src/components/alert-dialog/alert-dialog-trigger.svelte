<script lang="ts">
  import type { Snippet } from 'svelte'
  import { AlertDialog as BitsAlertDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import type { OverlayHandle } from '../../internal/overlay-handle.svelte'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type AlertDialogTriggerProps = WithoutChildrenOrChild<BitsAlertDialog.TriggerProps> & {
    /** Detached trigger: pair with `AlertDialog.createHandle()` when rendered outside Root. */
    handle?: OverlayHandle
    children?: Snippet
  }

  let { class: className, disabled, handle, children, ...rest }: AlertDialogTriggerProps = $props()
</script>

{#if handle}
  <button
    type="button"
    data-slot="alert-dialog-trigger"
    {disabled}
    class={cn(className)}
    onclick={() => {
      handle.open = true
    }}
    {...asBitsAttrs(rest)}
  >
    {@render children?.()}
  </button>
{:else}
  <BitsAlertDialog.Trigger data-slot="alert-dialog-trigger" {disabled} class={cn(className)} {...asBitsAttrs(rest)}>
    {@render children?.()}
  </BitsAlertDialog.Trigger>
{/if}
