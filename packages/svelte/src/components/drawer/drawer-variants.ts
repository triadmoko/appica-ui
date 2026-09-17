import { cn } from '../../internal/utils'
import type { DrawerSide } from './drawer-context'

export const VIEWPORT_SIDE: Record<DrawerSide, string> = {
  bottom: 'items-end justify-center',
  top: 'items-start justify-center',
  left: 'items-stretch justify-start',
  right: 'items-stretch justify-end',
}

export const POPUP_SIDE: Record<DrawerSide, string> = {
  bottom: cn(
    'w-full origin-bottom [height:var(--drawer-height,auto)] max-h-full [--stack-extent:var(--drawer-frontmost-height,var(--drawer-height,0px))]',
    'data-nested-drawer-open:[height:var(--drawer-frontmost-height,auto)] data-nested-drawer-open:overflow-hidden',
    '[transform:translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-offset)))_scale(var(--stack-scale))]',
    'data-starting-style:[transform:translateY(calc(100%+0.5rem))] data-ending-style:[transform:translateY(calc(100%+0.5rem))]',
  ),
  top: cn(
    'w-full origin-top [height:var(--drawer-height,auto)] max-h-full [--stack-extent:var(--drawer-frontmost-height,var(--drawer-height,0px))]',
    'data-nested-drawer-open:[height:var(--drawer-frontmost-height,auto)] data-nested-drawer-open:overflow-hidden',
    '[transform:translateY(calc(var(--drawer-swipe-movement-y)+var(--stack-offset)))_scale(var(--stack-scale))]',
    'data-starting-style:[transform:translateY(calc(-100%-0.5rem))] data-ending-style:[transform:translateY(calc(-100%-0.5rem))]',
  ),
  left: cn(
    'h-full w-96 max-w-full origin-left [--stack-extent:25rem]',
    '[transform:translateX(calc(var(--drawer-swipe-movement-x)+var(--stack-offset)))_scale(var(--stack-scale))]',
    'data-starting-style:[transform:translateX(calc(-100%-0.5rem))] data-ending-style:[transform:translateX(calc(-100%-0.5rem))]',
  ),
  right: cn(
    'h-full w-96 max-w-full origin-right [--stack-extent:25rem]',
    '[transform:translateX(calc(var(--drawer-swipe-movement-x)-var(--stack-offset)))_scale(var(--stack-scale))]',
    'data-starting-style:[transform:translateX(calc(100%+0.5rem))] data-ending-style:[transform:translateX(calc(100%+0.5rem))]',
  ),
}

export const POPUP_SNAP_SIDE: Record<'top' | 'bottom', string> = {
  bottom: cn(
    'h-[calc(100dvh-1rem)] w-full min-h-0 origin-bottom',
    '[--snap-offset:var(--drawer-snap-point-offset,0px)]',
    '[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)))]',
    'data-starting-style:[transform:translateY(calc(100%+0.5rem))] data-ending-style:[transform:translateY(calc(100%+0.5rem))]',
  ),
  top: cn(
    'h-[calc(100dvh-1rem)] w-full min-h-0 origin-top',
    '[--snap-offset:var(--drawer-snap-point-offset,0px)]',
    '[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)))]',
    'data-starting-style:[transform:translateY(calc(-100%-0.5rem))] data-ending-style:[transform:translateY(calc(-100%-0.5rem))]',
  ),
}

export const SHADOW_SIDE: Record<DrawerSide, string> = {
  bottom: 'shadow-[0_-24px_32px_-12px_var(--shadow-color)]',
  top: 'shadow-2xl',
  left: 'shadow-[24px_0_32px_-12px_var(--shadow-color)]',
  right: 'shadow-[-24px_0_32px_-12px_var(--shadow-color)]',
}

export const HANDLE_SIDE: Record<DrawerSide, string> = {
  bottom:
    'before:absolute before:top-1.5 before:left-1/2 before:h-1 before:w-11.5 before:-translate-x-1/2 before:rounded-full',
  top: 'before:absolute before:bottom-1.5 before:left-1/2 before:h-1 before:w-11.5 before:-translate-x-1/2 before:rounded-full',
  left: 'before:absolute before:inset-e-1.5 before:top-1/2 before:h-11.5 before:w-1 before:-translate-y-1/2 before:rounded-full',
  right:
    'before:absolute before:inset-s-1.5 before:top-1/2 before:h-11.5 before:w-1 before:-translate-y-1/2 before:rounded-full',
}

export const FRAME_PAD_SIDE: Record<DrawerSide, string> = {
  bottom: 'pt-4!',
  top: 'pb-4!',
  left: 'pe-4!',
  right: 'ps-4!',
}

export const CONTENT_RECLAIM_SIDE: Record<DrawerSide, string> = {
  bottom: 'overflow-hidden [&>[data-slot=drawer-header]]:-mt-4 [&>[data-slot=drawer-close-button]]:top-0',
  top: 'overflow-hidden [&>[data-slot=drawer-footer]]:-mb-4',
  left: 'overflow-hidden [&>:not([data-slot=drawer-close-button])]:-me-4 [&>[data-slot=drawer-close-button]]:inset-e-0',
  right: 'overflow-hidden [&>:not([data-slot=drawer-close-button])]:-ms-4',
}

export const STACK_VARS = cn(
  '[--stack-progress:clamp(0,var(--drawer-swipe-progress,0),1)] [--stack-step:0.05]',
  '[--stack-count:max(0,calc(var(--nested-drawers,0)-var(--stack-progress)))]',
  '[--stack-scale:clamp(0,calc(1-var(--stack-step)*var(--stack-count)),1)]',
  '[--stack-shrink:calc(1-var(--stack-scale))]',
  '[--stack-peek:calc(var(--stack-count)*1.5rem)]',
  '[--stack-offset:calc(var(--stack-peek)+var(--stack-shrink)*var(--stack-extent))]',
)
