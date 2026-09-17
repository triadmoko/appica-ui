<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  export type NavigationItemProps = HTMLLiAttributes & { children?: Snippet }
  let { class: className, children, ...rest }: NavigationItemProps = $props()
</script>

<li data-slot="navigation-item" class={className} {...rest}>
  {@render children?.()}
</li>
