import type { DateValue } from '@internationalized/date'
import { buttonVariants } from '../button/button-variants'
import { cn } from '../../internal/utils'

export type CalendarSize = 'sm' | 'md' | 'lg'
export type CalendarType = 'single' | 'multiple' | 'range'

export type DateRange = {
  from?: DateValue
  to?: DateValue
}

export type CalendarMonth = {
  value: DateValue
  weeks: DateValue[][]
}

export const ROOT_CONFIG: Record<CalendarSize, { text: string; cellVar: string; cellOuter: string }> = {
  sm: { text: 'text-xs', cellVar: '[--cell-size:--spacing(6)]', cellOuter: 'min-w-6.5' },
  md: { text: 'text-sm', cellVar: '[--cell-size:--spacing(8)]', cellOuter: 'min-w-8.5' },
  lg: { text: 'text-base', cellVar: '[--cell-size:--spacing(10)]', cellOuter: 'min-w-10.5' },
}

export const MONTH_GAP: Record<CalendarSize, string> = {
  sm: 'gap-4',
  md: 'gap-4.5',
  lg: 'gap-4.5',
}

export const HEADER_GAP: Record<CalendarSize, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-2.5',
}

export const WEEKDAY_PADDING: Record<CalendarSize, string> = {
  sm: 'pb-1.5',
  md: 'pb-2',
  lg: 'pb-2',
}

export const ROW_GAP: Record<CalendarSize, string> = {
  sm: 'mt-1',
  md: 'mt-1',
  lg: 'mt-1',
}

export const ROUNDED: Record<CalendarSize, { full: string; start: string; end: string }> = {
  sm: { full: 'rounded-xs', start: 'rounded-s-xs', end: 'rounded-e-xs' },
  md: { full: 'rounded-sm', start: 'rounded-s-sm', end: 'rounded-e-sm' },
  lg: { full: 'rounded-md', start: 'rounded-s-md', end: 'rounded-e-md' },
}

export const NAV_BUTTON_CLASS: Record<CalendarSize, string> = {
  sm: cn(
    buttonVariants({ variant: 'outline', size: 'icon-sm' }),
    "size-(--cell-size) rounded-xs [&_svg:not([class*='size-'])]:size-3.5",
  ),
  md: cn(buttonVariants({ variant: 'outline', size: 'icon-sm' }), 'size-(--cell-size)'),
  lg: cn(buttonVariants({ variant: 'outline', size: 'icon-md' }), 'size-(--cell-size)'),
}

export const PREV_CHEVRON_FLIP = '[&_svg]:rtl:rotate-180'
export const NEXT_CHEVRON_FLIP = '[&_svg]:rotate-180 [&_svg]:rtl:rotate-0'

export const SELECT_CLASS: Record<CalendarSize, string> = {
  sm: 'h-6 px-2 rounded-xs text-xs',
  md: 'h-8 px-2.5 rounded-sm text-sm',
  lg: 'h-10 px-3 rounded-md text-base',
}

export const DAY_BUTTON_BASE = cn(
  'relative isolate flex size-(--cell-size) cursor-pointer items-center justify-center',
  'font-normal whitespace-nowrap outline-offset-1 outline-ring',
  'transform-gpu transition duration-250 ease-[cubic-bezier(0.175,0.885,0.32,1.5)]',
  'active:scale-[0.97] active:translate-y-px active:duration-100 active:ease-in-out',
  'motion-reduce:transition-none',
  'before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit]',
  'before:bg-background-muted before:opacity-0',
  'before:transition-all before:duration-300 motion-reduce:before:transition-none',
  'text-foreground-strong',
  'data-outside-month:text-foreground-muted',
  'hover:text-foreground-intense hover:font-medium hover:before:opacity-100',
  'data-today:text-foreground-intense data-today:font-medium data-today:before:opacity-100',
  'data-selected:before:bg-primary data-selected:text-primary-foreground data-selected:outline-ring-primary data-selected:hover:before:bg-primary data-selected:before:opacity-100',
  'data-range-middle:text-foreground-intense data-range-middle:rounded-none data-range-middle:font-medium data-range-middle:before:bg-background-muted data-range-middle:before:opacity-100 data-range-middle:hover:before:bg-background-muted',
  'data-disabled:text-foreground-subtle data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:line-through data-disabled:before:opacity-0!',
)

export const SELECT_BASE = cn(
  'bg-background-muted text-foreground-intense border-transparent w-auto cursor-pointer appearance-none',
  'outline-ring focus-visible:outline-offset-1',
  'disabled:pointer-events-none disabled:opacity-disabled',
)
