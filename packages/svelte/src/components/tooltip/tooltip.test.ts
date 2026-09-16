import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import TooltipHost from './tooltip.test-host.svelte'
import TooltipToolbarHost from './tooltip.toolbar-host.svelte'

describe('Tooltip', () => {
  it('renders the trigger and tags it with data-slot', () => {
    render(TooltipHost)
    const trigger = screen.getByRole('button', { name: 'Hover' })
    expect(trigger.getAttribute('data-slot')).toBe('tooltip-trigger')
  })

  it('does not render content before hover', () => {
    render(TooltipHost, { props: { content: 'Hidden until hover' } })
    expect(screen.queryByText('Hidden until hover')).toBeNull()
  })

  it('shows content on hover and hides on unhover', async () => {
    const user = userEvent.setup()
    render(TooltipHost, { props: { content: 'Add to library', disableHoverablePopup: true } })

    await user.hover(screen.getByRole('button', { name: 'Hover' }))
    const content = await screen.findByText('Add to library')
    expect(content).toBeTruthy()
    const popup = content.closest('[data-slot="tooltip-content"]') as HTMLElement
    expect(popup).not.toBeNull()
    expect(popup.className).toContain('bg-background-inverse')
    expect(popup.className).toContain('text-foreground-inverse')
    expect(popup.className).toContain('data-starting-style:motion-safe:scale-90')
    expect(popup.className).toContain('data-ending-style:motion-safe:duration-100')
    expect(popup.className).toContain('data-[state=instant-open]:motion-safe:transition-none')

    await user.unhover(screen.getByRole('button', { name: 'Hover' }))
    await waitFor(() => {
      expect(screen.queryByText('Add to library')).toBeNull()
    })
  })

  it('renders the arrow inside the popup', async () => {
    const user = userEvent.setup()
    render(TooltipHost)
    await user.hover(screen.getByRole('button', { name: 'Hover' }))

    await screen.findByText('Add to library')
    const arrow = document.querySelector('[data-slot="tooltip-arrow"]') as HTMLElement | null
    expect(arrow).not.toBeNull()
    expect(arrow!.className).toContain('size-2.5')
    expect(arrow!.className).toContain('rotate-45')
  })

  it('omits the arrow when arrow is false', async () => {
    const user = userEvent.setup()
    render(TooltipHost, { props: { arrow: false, content: 'No arrow here.' } })

    await user.hover(screen.getByRole('button', { name: 'Hover' }))
    await screen.findByText('No arrow here.')

    expect(document.querySelector('[data-slot="tooltip-arrow"]')).toBeNull()
  })

  it('shows on focus (keyboard)', async () => {
    const user = userEvent.setup()
    render(TooltipHost, { props: { content: 'Keyboard-visible' } })
    await user.tab()
    expect(await screen.findByText('Keyboard-visible')).toBeTruthy()
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(TooltipHost, { props: { disabled: true, content: 'Should stay hidden' } })

    await user.hover(screen.getByRole('button', { name: 'Hover' }))
    expect(screen.queryByText('Should stay hidden')).toBeNull()
  })

  it('opens when disableHoverablePopup is set', async () => {
    const user = userEvent.setup()
    render(TooltipHost, { props: { disableHoverablePopup: true, content: 'Pointer-proof' } })

    await user.hover(screen.getByRole('button', { name: 'Hover' }))
    expect(await screen.findByText('Pointer-proof')).toBeTruthy()
  })

  it('tracks the cursor when trackCursorAxis is set', async () => {
    const user = userEvent.setup()
    render(TooltipHost, { props: { trackCursorAxis: 'x', content: 'Following the cursor' } })

    await user.hover(screen.getByRole('button', { name: 'Hover' }))
    expect(await screen.findByText('Following the cursor')).toBeTruthy()
  })

  it('forwards DirectionProvider dir onto the portaled popup', async () => {
    const user = userEvent.setup()
    render(TooltipHost, { props: { dir: 'rtl', content: 'RTL popup' } })

    await user.hover(screen.getByRole('button', { name: 'Hover' }))
    const content = await screen.findByText('RTL popup')
    const popup = content.closest('[data-slot="tooltip-content"]') as HTMLElement
    expect(popup.closest('[dir]')?.getAttribute('dir')).toBe('rtl')
  })

  it('has no accessibility violations (closed state)', async () => {
    const { container } = render(TooltipHost)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('joins toolbar roving tabindex when rendered inside Toolbar', async () => {
    const user = userEvent.setup()
    render(TooltipToolbarHost)

    const bold = screen.getByRole('button', { name: 'Bold' })
    const italic = screen.getByRole('button', { name: 'Italic' })
    expect(bold).toHaveAttribute('tabindex', '0')
    expect(italic).toHaveAttribute('tabindex', '-1')

    bold.focus()
    await user.keyboard('{ArrowRight}')
    expect(italic).toHaveFocus()
  })
})
