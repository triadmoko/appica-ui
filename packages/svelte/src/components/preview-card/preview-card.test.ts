import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { PreviewCard } from './index'
import PreviewCardHost from './preview-card.test-host.svelte'

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 })
const overlayText = { hidden: true as const }
const triggerName = { name: 'example.com' }

describe('PreviewCard', () => {
  it('renders the trigger as a link tagged with data-slot', () => {
    render(PreviewCardHost)
    const trigger = screen.getByRole('link', triggerName)
    expect(trigger.tagName).toBe('A')
    expect(trigger).toHaveAttribute('href', 'https://example.com')
    expect(trigger.getAttribute('data-slot')).toBe('preview-card-trigger')
    expect(trigger.getAttribute('role')).toBe('link')
  })

  it('does not render content before hover', () => {
    render(PreviewCardHost, { props: { body: 'Hidden until hover' } })
    expect(screen.queryByText('Hidden until hover')).toBeNull()
  })

  it('shows content on hover', async () => {
    const user = setupUser()
    render(PreviewCardHost)

    const trigger = screen.getByRole('link', triggerName)
    await user.hover(trigger)

    const body = await screen.findByText('A short preview of the linked page.', overlayText)
    const popup = body.closest('[data-slot="preview-card-content"]') as HTMLElement
    expect(popup).not.toBeNull()
    expect(popup.className).toContain('bg-background')
    expect(popup.className).toContain('rounded-xl')
    expect(popup.className).toContain('border-border-overlay')

    trigger.focus()
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByText('A short preview of the linked page.', overlayText)).toBeNull()
    })
  })

  it('renders the arrow as a sibling of the inner card', async () => {
    const user = setupUser()
    render(PreviewCardHost)
    await user.hover(screen.getByRole('link', triggerName))
    await screen.findByText('A short preview of the linked page.', overlayText)

    const card = document.querySelector('[data-slot="preview-card-content"]') as HTMLElement
    const arrow = document.querySelector('[data-slot="preview-card-arrow"]') as HTMLElement | null
    expect(arrow).not.toBeNull()
    expect(arrow!.querySelector('svg')).not.toBeNull()
    expect(card.contains(arrow)).toBe(false)
    expect(card.parentElement?.contains(arrow)).toBe(true)
  })

  it('omits the arrow and the thicker side border when arrow is false', async () => {
    const user = setupUser()
    render(PreviewCardHost, { props: { arrow: false, body: 'No arrow here.' } })

    await user.hover(screen.getByRole('link', triggerName))
    const body = await screen.findByText('No arrow here.', overlayText)

    expect(document.querySelector('[data-slot="preview-card-arrow"]')).toBeNull()

    const popup = body.closest('[data-slot="preview-card-content"]') as HTMLElement
    expect(popup.className).not.toMatch(/border-[a-z]-2/)
  })

  it('keeps the content mounted while closed when keepMounted is set', () => {
    render(PreviewCardHost, { props: { keepMounted: true, body: 'Always in the DOM' } })
    expect(document.querySelector('[data-slot="preview-card-content"]')).not.toBeNull()
    expect(screen.getByText('Always in the DOM')).toBeInTheDocument()
  })

  it('forwards DirectionProvider dir onto the portaled popup', async () => {
    const user = setupUser()
    render(PreviewCardHost, { props: { dir: 'rtl', body: 'RTL popup' } })

    await user.hover(screen.getByRole('link', triggerName))
    const content = await screen.findByText('RTL popup', overlayText)
    const popup = content.closest('[data-slot="preview-card-content"]') as HTMLElement
    expect(popup.closest('[dir]')?.getAttribute('dir')).toBe('rtl')
  })

  it('exposes createHandle for detached trigger patterns', () => {
    expect(typeof PreviewCard.createHandle).toBe('function')
  })

  it('has no accessibility violations (closed state)', async () => {
    const { container } = render(PreviewCardHost)
    expect(await axe(container)).toHaveNoViolations()
  })
})
