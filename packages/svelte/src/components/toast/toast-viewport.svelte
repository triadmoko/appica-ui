<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  import { cn } from '../../internal/utils'
  import { useDirection } from '../../hooks/use-direction/use-direction'
  import { getToastViewContext, setToastViewContext } from './toast-position'
  import { viewportPositionClasses } from './toast-variants'
  import type { ToastPosition } from './toast-manager.svelte'

  type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * Where the stack is anchored.
     * @default 'bottom-right'
     */
    position?: ToastPosition
    children?: Snippet
  }

  let { class: className, position: positionProp, children, ...rest }: Props = $props()

  const parent = getToastViewContext()
  let expanded = $state(false)
  const position = $derived(positionProp ?? parent.position)

  setToastViewContext({
    get position() {
      return position
    },
    get expanded() {
      return expanded
    },
  })

  const direction = useDirection()
  const classes = $derived(
    cn(
      'group/toast-viewport pointer-events-none has-[[data-slot=toast]]:pointer-events-auto fixed z-50 w-90 max-w-[calc(100vw-2rem)] outline-none',
      viewportPositionClasses[position],
      className,
    ),
  )
</script>

<div
  data-slot="toast-viewport"
  data-position={position}
  data-expanded={expanded ? '' : undefined}
  dir={direction.current}
  class={classes}
  onmouseenter={() => (expanded = true)}
  onmouseleave={() => (expanded = false)}
  {...rest}
>
  {@render children?.()}
</div>
