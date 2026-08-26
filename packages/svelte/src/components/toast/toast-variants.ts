import type { ClassValue } from 'clsx'
import { cn } from '../../internal/utils'
import type { ToastPosition } from './toast-manager.svelte'

export const viewportPositionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
}

export const toastAnimationBase =
  'pointer-events-auto ' +
  '[--gap:0.75rem] [--peek:0.75rem] ' +
  '[--scale:calc(max(0,1-(var(--toast-index)*0.1)))] ' +
  '[--shrink:calc(1-var(--scale))] ' +
  '[--height:var(--toast-frontmost-height,var(--toast-height))] ' +
  'absolute z-[calc(1000-var(--toast-index))] w-full select-none ' +
  'data-expanded:h-[var(--toast-height)] ' +
  'data-ending-style:opacity-0 data-limited:opacity-0 ' +
  '[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] ' +
  'motion-reduce:transition-none'

export const toastSizeClass = 'h-[var(--height)]'

const toastTranslateBottom =
  'translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))'

const toastTranslateTop =
  'translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))'

export const toastAnimationBottom =
  'right-0 bottom-0 left-0 origin-bottom ' +
  '[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] ' +
  `[transform:${toastTranslateBottom}] ` +
  `data-stacked:not-data-expanded:[transform:${toastTranslateBottom}_scale(var(--scale))] ` +
  'data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] ' +
  'motion-safe:data-starting-style:[transform:translateY(150%)] ' +
  'motion-safe:[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]'

export const toastAnimationTop =
  'top-0 right-0 left-0 origin-top ' +
  '[--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] ' +
  `[transform:${toastTranslateTop}] ` +
  `data-stacked:not-data-expanded:[transform:${toastTranslateTop}_scale(var(--scale))] ` +
  'data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] ' +
  'motion-safe:data-starting-style:[transform:translateY(-150%)] ' +
  'motion-safe:[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]'

export function toastShellClass(position: ToastPosition, className?: ClassValue) {
  const isBottom = position.startsWith('bottom')
  return cn('group/toast', toastAnimationBase, isBottom ? toastAnimationBottom : toastAnimationTop, className)
}

export function toastSurfaceClass(position: ToastPosition) {
  const isBottom = position.startsWith('bottom')
  return cn(
    'relative isolate w-full rounded-xl border-border-overlay bg-background text-foreground border p-4 text-sm backdrop-blur-xl',
    isBottom ? 'shadow-[0_-8px_16px_-4px_var(--shadow-color)]' : 'shadow-lg',
    'grid items-start gap-x-0 gap-y-2',
    'has-data-[slot=toast-icon]:gap-x-3',
    'grid-cols-[auto_1fr_auto]',
    "[grid-template-areas:'icon_title_close']",
    "has-data-[slot=toast-description]:[grid-template-areas:'icon_title_close'_'icon_description_close']",
    "has-data-[slot=toast-actions]:not-has-data-[slot=toast-description]:[grid-template-areas:'icon_title_close'_'icon_actions_actions']",
    "has-data-[slot=toast-actions]:has-data-[slot=toast-description]:[grid-template-areas:'icon_title_close'_'icon_description_close'_'icon_actions_actions']",
  )
}

export function toastRootClass(position: ToastPosition, className?: ClassValue) {
  return cn(toastShellClass(position, className), toastSurfaceClass(position))
}
