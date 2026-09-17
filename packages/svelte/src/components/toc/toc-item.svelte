<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  export type TocItemProps = HTMLLiAttributes & { children?: Snippet }
  let { class: className, children, ...rest }: TocItemProps = $props()
</script>

<li data-slot="toc-item" class={className} {...rest}>
  {@render children?.()}
</li>
