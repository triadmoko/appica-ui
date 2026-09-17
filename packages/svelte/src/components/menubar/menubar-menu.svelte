<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Menubar as BitsMenubar } from 'bits-ui'
  import { asBitsAttrs } from '../../internal/utils'

  export type MenubarMenuProps = {
    /** Value assigned to this menu. Used to control which menu is open. */
    value?: string
    onOpenChange?: (open: boolean) => void
    children?: Snippet
  }

  let { value, onOpenChange, children, ...rest }: MenubarMenuProps = $props()
</script>

<BitsMenubar.Menu {value} {onOpenChange} {...asBitsAttrs(rest)}>
  {@render children?.()}
</BitsMenubar.Menu>
