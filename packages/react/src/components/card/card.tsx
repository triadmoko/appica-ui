import * as React from 'react'
import { cn } from '../../utils'

/**
 * Server-safe stand-in for Base UI's `useRender`.
 *
 * Base UI's version is a hook, so any component using it becomes a client
 * component. `Card` is a pure layout container that must stay renderable from a
 * Server Component, so the `render` escape hatch is implemented with
 * `cloneElement` instead. Only the element form is supported (no render
 * function) — that keeps it serialisable across the RSC boundary.
 */
type RenderProp = React.ReactElement<{ className?: string }>

function renderElement(
  fallback: React.ElementType,
  render: RenderProp | undefined,
  base: string,
  className: string | undefined,
  props: Record<string, unknown>,
) {
  if (React.isValidElement<{ className?: string }>(render)) {
    return React.cloneElement(render, {
      ...props,
      ...render.props,
      className: cn(base, render.props.className, className),
    })
  }
  return React.createElement(fallback, { ...props, className: cn(base, className) })
}

/**
 * `--card-radius` is the card's own corner — the one on the content wrapper, and
 * the only knob a consumer sets (`className="[--card-radius:var(--radius-2xl)]"`).
 * The frame and the inset media scale off it *proportionally* rather than by
 * subtracting their padding — subtraction leaves inset media on a hairline
 * corner at the default radius, and collapses it entirely below that.
 */
const CARD_RADIUS = '[--card-radius:var(--radius-xl)]'
const FRAME_RADIUS = 'rounded-[calc(var(--card-radius)*4/3)]'

type CardFrame = 'none' | 'solid' | 'glass'

const frameVariants: Record<CardFrame, string> = {
  none: 'rounded-(--card-radius)',
  solid: cn(FRAME_RADIUS, 'bg-background-subtle p-2'),
  glass: cn(FRAME_RADIUS, 'border border-white/15 bg-white/10 p-2 backdrop-blur-sm'),
}

const contentFrameVariants: Record<CardFrame, string> = {
  none: 'border',
  solid: 'border-border-muted border',
  glass: '',
}

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Wraps the card content in a padded frame. `true` is an alias for `'solid'`.
   * `'glass'` is the translucent, blurred frame used by Dialog and Drawer — it
   * only reads as glass over imagery or a coloured backdrop.
   * @default false
   */
  frame?: boolean | 'solid' | 'glass'
  /**
   * Insets header, footer and media from the content edge so media clips into a
   * floating, fully-rounded panel. Set to `false` for edge-to-edge media.
   * @default true
   */
  inset?: boolean
  /** Escape hatch for the inner content wrapper — the flex column that holds the slots. */
  contentProps?: React.ComponentPropsWithoutRef<'div'>
  /** Render as a different element, e.g. `render={<article />}` or `<li />`. */
  render?: RenderProp
}

function Card({ frame = false, inset = true, className, contentProps, render, children, ...props }: CardProps) {
  const variant: CardFrame = frame === true ? 'solid' : frame === false ? 'none' : frame

  return renderElement('div', render, cn('group/card flex flex-col', CARD_RADIUS, frameVariants[variant]), className, {
    'data-slot': 'card',
    'data-frame': variant,
    ...(inset ? { 'data-inset': '' } : {}),
    ...props,
    children: (
      <div
        data-slot="card-content"
        {...contentProps}
        className={cn(
          'bg-background flex min-h-0 flex-1 flex-col overflow-hidden rounded-(--card-radius)',
          inset && 'p-2',
          contentFrameVariants[variant],
          contentProps?.className,
        )}
      >
        {children}
      </div>
    ),
  })
}

interface CardMediaProps extends React.ComponentPropsWithoutRef<'div'> {}

function CardMedia({ className, ...props }: CardMediaProps) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        'relative shrink-0 overflow-hidden',
        'group-data-inset/card:rounded-[calc(var(--card-radius)*3/4)]',
        '[&>img]:size-full [&>img]:object-cover [&>video]:size-full [&>video]:object-cover',
        className,
      )}
      {...props}
    />
  )
}

interface CardHeaderProps extends React.ComponentPropsWithoutRef<'div'> {}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-1 flex-col gap-1.5 p-6 group-data-inset/card:px-4', className)}
      {...props}
    />
  )
}

interface CardTitleProps extends React.ComponentPropsWithoutRef<'h3'> {
  render?: RenderProp
}

function CardTitle({ className, render, ...props }: CardTitleProps) {
  return renderElement('h3', render, 'text-foreground-intense text-lg font-semibold', className, {
    'data-slot': 'card-title',
    ...props,
  })
}

interface CardDescriptionProps extends React.ComponentPropsWithoutRef<'p'> {
  render?: RenderProp
}

function CardDescription({ className, render, ...props }: CardDescriptionProps) {
  return renderElement('p', render, 'text-foreground-muted text-sm', className, {
    'data-slot': 'card-description',
    ...props,
  })
}

interface CardFooterProps extends React.ComponentPropsWithoutRef<'div'> {}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex flex-col-reverse gap-2 px-6 pb-6 sm:flex-row sm:items-center',
        'group-data-inset/card:px-4 group-data-inset/card:pb-4',
        className,
      )}
      {...props}
    />
  )
}

export { Card, CardMedia, CardHeader, CardTitle, CardDescription, CardFooter }
export type { CardProps, CardMediaProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardFooterProps }
