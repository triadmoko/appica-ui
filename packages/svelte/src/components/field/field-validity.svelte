<script lang="ts">
  import type { Snippet } from 'svelte'
  import { requireFieldContext, type FieldValidityState } from './field-context'

  export type { FieldValidityState }

  type Props = {
    children?: Snippet<[FieldValidityState]>
  }

  let { children }: Props = $props()

  const field = requireFieldContext()
  const state = $derived(field.validity())
</script>

{@render children?.(state)}
