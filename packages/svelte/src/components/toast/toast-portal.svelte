<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Portal } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'

  type Props = {
    /**
     * Portal target.
     * @default document.body
     */
    to?: Element | string
    children?: Snippet
  }

  let { to, children, ...rest }: Props = $props()
</script>

<Portal {to} {...asBitsAttrs(rest)}>
  {@render children?.()}
</Portal>
