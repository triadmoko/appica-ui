import type { ClassValue } from 'clsx'
import { cn } from '../../internal/utils'
import type { ContextMenuSize } from './context-menu-context'

export type ContextMenuSide = 'top' | 'right' | 'bottom' | 'left' | 'inline-end' | 'inline-start'
export type ContextMenuAlign = 'start' | 'center' | 'end'

export const POPUP_SIZE: Record<ContextMenuSize, string> = {
  sm: 'min-w-40 rounded-md',
  md: 'min-w-48 rounded-lg',
  lg: 'min-w-56 rounded-xl',
}

export const ICON_SIZE: Record<ContextMenuSize, string> = {
  sm: 'size-4',
  md: 'size-4.5',
  lg: 'size-5',
}

export const ITEM_TEXT: Record<ContextMenuSize, string> = {
  sm: 'gap-1',
  md: 'gap-1.5',
  lg: 'gap-1.5',
}

export const GROUP_LABEL_SIZE: Record<ContextMenuSize, string> = {
  sm: 'px-2.5 pt-1.5 pb-1 text-xs',
  md: 'px-3 pt-2 pb-1.25 text-sm',
  lg: 'px-3.5 pt-2.5 pb-1.5 text-base',
}

export const ITEM_BASE = 'w-full outline-hidden'

export const POPUP_SCROLLER = 'flex flex-col gap-0.5 overflow-x-hidden overflow-y-auto p-2'

export const CHECK_PATH_CLASS = cn(
  'opacity-0 [stroke-dashoffset:1.02]',
  'group-data-checked/check:opacity-100 group-data-checked/check:[stroke-dashoffset:0]',
  'motion-safe:transition-[opacity,stroke-dashoffset] motion-safe:ease-out',
  'motion-safe:delay-[0ms,150ms] motion-safe:duration-[150ms,0ms]',
  'motion-safe:group-data-checked/check:delay-[0ms] motion-safe:group-data-checked/check:duration-[0ms,300ms]',
)

export function physicalSide(side: ContextMenuSide, dir: 'ltr' | 'rtl'): 'top' | 'right' | 'bottom' | 'left' {
  switch (side) {
    case 'top':
    case 'bottom':
    case 'left':
    case 'right':
      return side
    case 'inline-end':
      return dir === 'rtl' ? 'left' : 'right'
    case 'inline-start':
      return dir === 'rtl' ? 'right' : 'left'
    default: {
      const _exhaustive: never = side
      return _exhaustive
    }
  }
}

export function popupClassName(size: ContextMenuSize, className?: ClassValue) {
  return cn(
    'max-h-(--bits-context-menu-content-available-height) bg-background border-border-overlay flex flex-col border shadow-2xl outline-none',
    POPUP_SIZE[size],
    'origin-(--bits-context-menu-content-transform-origin)',
    'motion-safe:transition-[opacity,scale] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.175,0.885,0.32,1.5)]',
    'group-data-[state=closed]/popup:motion-safe:scale-95 group-data-[state=closed]/popup:motion-safe:opacity-0',
    'group-data-starting-style/popup:motion-safe:scale-90 group-data-starting-style/popup:motion-safe:opacity-0',
    'group-data-ending-style/popup:motion-safe:scale-95 group-data-ending-style/popup:motion-safe:opacity-0 group-data-ending-style/popup:motion-safe:duration-100 group-data-ending-style/popup:motion-safe:ease-out',
    className,
  )
}
