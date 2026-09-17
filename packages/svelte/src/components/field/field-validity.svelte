<script lang="ts">
  import type { Snippet } from 'svelte'
  import { requireFieldContext, type FieldValidityState } from './field-context'

  export type { FieldValidityState }

  export type FieldValidityProps = {
    children?: Snippet<[FieldValidityState]>
  }

  let { children }: FieldValidityProps = $props()

  const field = requireFieldContext()
  const state = $derived(field.validity())
</script>

{@render children?.(state)}
