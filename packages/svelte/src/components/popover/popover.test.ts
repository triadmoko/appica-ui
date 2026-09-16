import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { Popover } from './index'
import PopoverHost from './popover.test-host.svelte'

const overlayText = { hidden: true as const }

describe('Popover', () => {
  it('renders the trigger and tags it with data-slot', () => {
    render(PopoverHost)
    const trigger = screen.getByRole('button', { name: 'Open' })
    expect(trigger.getAttribute('data-slot')).toBe('popover-trigger')
  })

  it('does not render content before being opened', () => {
    render(PopoverHost, { props: { description: 'Hidden until click' } })
    expect(screen.queryByText('Hidden until click')).toBeNull()
  })

  it('keeps the content mounted while closed when keepMounted is set', () => {
    render(PopoverHost, { props: { keepMounted: true, description: 'Always in the DOM' } })
    expect(document.querySelector('[data-slot="popover-content"]')).not.toBeNull()
    expect(screen.getByText('Always in the DOM')).toBeInTheDocument()
  })

  it('opens on click and closes on Escape', async () => {
    const user = userEvent.setup()
    render(PopoverHost)

    await user.click(screen.getByRole('button', { name: 'Open' }))
    const description = await screen.findByText('You are all caught up.')
    expect(description).toBeTruthy()

    const popup = description.closest('[data-slot="popover-content"]') as HTMLElement
    expect(popup).not.toBeNull()
    expect(popup.className).toContain('bg-background')
    expect(popup.className).toContain('rounded-xl')
    expect(popup.className).toContain('border-border-overlay')

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByText('You are all caught up.')).toBeNull()
    })
  })

  it('closes when PopoverClose is clicked', async () => {
    const user = userEvent.setup()
    render(PopoverHost)

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByText('You are all caught up.')

    const close = document.querySelector('[data-slot="popover-close"]') as HTMLElement
    expect(close).not.toBeNull()
    await user.click(close)
    await waitFor(() => {
      expect(screen.queryByText('You are all caught up.')).toBeNull()
    })
  })

  it('does not trap focus by default', async () => {
    const user = userEvent.setup()
    render(PopoverHost)

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByText('You are all caught up.')

    const outside = screen.getByRole('button', { name: 'Outside' })
    outside.focus()
    expect(document.activeElement).toBe(outside)
  })

  it('renders the title with intense foreground styles', async () => {
    const user = userEvent.setup()
    render(PopoverHost, { props: { title: 'Heading' } })
    await user.click(screen.getByRole('button', { name: 'Open' }))

    const title = await screen.findByText('Heading')
    expect(title.getAttribute('data-slot')).toBe('popover-title')
    expect(title.className).toContain('text-foreground-intense')
    expect(title.className).toContain('font-semibold')
  })

  it('renders the arrow as a sibling of the inner card', async () => {
    const user = userEvent.setup()
    render(PopoverHost)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByText('You are all caught up.')

    const card = document.querySelector('[data-slot="popover-content"]') as HTMLElement
    const arrow = document.querySelector('[data-slot="popover-arrow"]') as HTMLElement | null
    expect(arrow).not.toBeNull()
    expect(arrow!.querySelector('svg')).not.toBeNull()
    expect(card.contains(arrow)).toBe(false)
    expect(card.parentElement?.contains(arrow)).toBe(true)
  })

  it('omits the arrow and the thicker side border when arrow is false', async () => {
    const user = userEvent.setup()
    render(PopoverHost, { props: { arrow: false, description: 'No arrow here.' } })

    await user.click(screen.getByRole('button', { name: 'Open' }))
    const description = await screen.findByText('No arrow here.')

    expect(document.querySelector('[data-slot="popover-arrow"]')).toBeNull()

    const popup = description.closest('[data-slot="popover-content"]') as HTMLElement
    expect(popup.className).not.toMatch(/border-[a-z]-2/)
  })

  it('opens on hover when openOnHover is set', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(PopoverHost, { props: { openOnHover: true, delay: 0, description: 'Hover opened.' } })

    await user.hover(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Hover opened.', overlayText)).toBeTruthy()
  })

  it('forwards DirectionProvider dir onto the portaled popup', async () => {
    const user = userEvent.setup()
    render(PopoverHost, { props: { dir: 'rtl', description: 'RTL popup' } })

    await user.click(screen.getByRole('button', { name: 'Open' }))
    const content = await screen.findByText('RTL popup')
    const popup = content.closest('[data-slot="popover-content"]') as HTMLElement
    expect(popup.closest('[dir]')?.getAttribute('dir')).toBe('rtl')
  })

  it('exposes createHandle for detached trigger patterns', () => {
    expect(typeof Popover.createHandle).toBe('function')
  })

  it('has no accessibility violations (closed state)', async () => {
    const { container } = render(PopoverHost)
    expect(await axe(container)).toHaveNoViolations()
  })
})
