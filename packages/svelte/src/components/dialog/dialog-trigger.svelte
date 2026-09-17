<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Dialog as BitsDialog, type WithoutChildrenOrChild } from 'bits-ui'
  import type { OverlayHandle } from '../../internal/overlay-handle.svelte'
  import { asBitsAttrs, cn } from '../../internal/utils'

  export type DialogTriggerProps = WithoutChildrenOrChild<BitsDialog.TriggerProps> & {
    /** Detached trigger: pair with `Dialog.createHandle()` when rendered outside Root. */
    handle?: OverlayHandle
    children?: Snippet
  }

  let { class: className, disabled, handle, children, ...rest }: DialogTriggerProps = $props()
</script>

{#if handle}
  <button
    type="button"
    data-slot="dialog-trigger"
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
  <BitsDialog.Trigger data-slot="dialog-trigger" {disabled} class={cn(className)} {...asBitsAttrs(rest)}>
    {@render children?.()}
  </BitsDialog.Trigger>
{/if}
