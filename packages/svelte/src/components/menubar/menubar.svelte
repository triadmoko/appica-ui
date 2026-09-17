<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { Menubar as BitsMenubar } from 'bits-ui'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import {
    setMenubarContext,
    type MenubarOrientation,
    type MenubarSize,
    type MenubarVariant,
  } from './menubar-context'

  const HORIZONTAL_GAP: Partial<Record<MenubarVariant, string>> = {
    pill: 'gap-0.5',
    line: 'gap-7',
  }

  const VERTICAL_GAP: Partial<Record<MenubarVariant, string>> = {
    pill: 'gap-0.5',
  }

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Trigger appearance - hover/active pill, or an animated underline.
     * @default 'pill'
     */
    variant?: MenubarVariant
    /**
     * Scales the triggers, popups, and items together.
     * @default 'md'
     */
    size?: MenubarSize
    /**
     * Layout of the trigger row.
     * @default 'horizontal'
     */
    orientation?: MenubarOrientation
    /**
     * Wrap arrow-key focus from the last trigger back to the first.
     * @default true
     */
    loopFocus?: boolean
    /**
     * Trap focus and block outside scroll/interaction while a menu is open.
     * @default true
     */
    modal?: boolean
    children?: Snippet
  }

  let {
    class: className,
    variant = 'pill',
    size = 'md',
    orientation = 'horizontal',
    loopFocus = true,
    modal = true,
    dir,
    children,
    ...rest
  }: Props = $props()

  const direction = useDirection()
  const resolvedDir = $derived(dir === 'rtl' || dir === 'ltr' ? dir : direction.current)

  setMenubarContext({
    get variant() {
      return variant
    },
    get size() {
      return size
    },
    get orientation() {
      return orientation
    },
    get modal() {
      return modal
    },
  })

  const gap = $derived((orientation === 'vertical' ? VERTICAL_GAP : HORIZONTAL_GAP)[variant])
  const classes = $derived(
    cn(
      'flex w-fit',
      orientation === 'vertical' ? 'flex-col items-stretch' : 'items-center',
      gap,
      className,
    ),
  )
</script>

<BitsMenubar.Root
  data-slot="menubar"
  data-orientation={orientation}
  class={classes}
  loop={loopFocus}
  dir={resolvedDir}
  {...asBitsAttrs(rest)}
>
  {@render children?.()}
</BitsMenubar.Root>
