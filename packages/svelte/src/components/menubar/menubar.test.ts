import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import MenubarHost from './menubar.test-host.svelte'

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 })
const overlayText = { hidden: true as const }

describe('Menubar', () => {
  it('renders a horizontal menubar with the expected slot and orientation', () => {
    render(MenubarHost)
    const bar = screen.getByRole('menubar', { name: 'Main' })
    expect(bar.getAttribute('data-slot')).toBe('menubar')
    expect(bar.getAttribute('data-orientation')).toBe('horizontal')
  })

  it('applies flex-col styling when orientation is vertical', () => {
    render(MenubarHost, { props: { orientation: 'vertical' } })
    const bar = screen.getByRole('menubar', { name: 'Main' })
    expect(bar.getAttribute('data-orientation')).toBe('vertical')
    expect(bar.className).toContain('flex-col')
  })

  it('mirrors orientation onto each trigger so the line variant selectors apply', () => {
    render(MenubarHost, { props: { variant: 'line', orientation: 'vertical' } })
    const trigger = screen.getByRole('menuitem', { name: 'File' })
    expect(trigger.getAttribute('data-orientation')).toBe('vertical')
  })

  it('styles triggers with the pill variant by default', () => {
    render(MenubarHost)
    const trigger = screen.getByRole('menuitem', { name: 'File' })
    expect(trigger.className).toContain('before:bg-background-muted')
  })

  it('styles triggers with the line variant when requested', () => {
    render(MenubarHost, { props: { variant: 'line' } })
    const trigger = screen.getByRole('menuitem', { name: 'File' })
    expect(trigger.className).toContain('after:bg-no-repeat')
  })

  it('propagates size down to triggers and popup content', async () => {
    const user = setupUser()
    render(MenubarHost, { props: { size: 'lg' } })
    const trigger = screen.getByRole('menuitem', { name: 'File' })
    expect(trigger.className).toContain('text-base')

    await user.click(trigger)
    const item = await screen.findByText('New', overlayText)
    const popup = item.closest('[data-slot="menubar-content"]') as HTMLElement
    expect(popup).not.toBeNull()
    expect(popup.className).toContain('rounded-xl')
  })

  it('opens a menu on trigger click and shows items', async () => {
    const user = setupUser()
    render(MenubarHost)
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    const item = await screen.findByText('New', overlayText)
    expect(item.closest('[data-slot="menubar-item"]')).toHaveAttribute('role', 'menuitem')
  })

  it('closes on item click', async () => {
    const user = setupUser()
    render(MenubarHost)
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    await user.click(await screen.findByText('New', overlayText))
    await waitFor(() => {
      expect(screen.queryByText('New', overlayText)).toBeNull()
    })
  })

  it('closes the open menu on Escape', async () => {
    const user = setupUser()
    render(MenubarHost)
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    await screen.findByText('New', overlayText)
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByText('New', overlayText)).toBeNull()
    })
  })

  it('moves focus between triggers with arrow keys', async () => {
    const user = setupUser()
    render(MenubarHost)
    const file = screen.getByRole('menuitem', { name: 'File' })
    file.focus()
    expect(file).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus()
  })

  it('marks disabled items with data-disabled', async () => {
    const user = setupUser()
    render(MenubarHost)
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    const disabled = (await screen.findByText('Disabled', overlayText)).closest('[data-slot="menubar-item"]')
    expect(disabled).toHaveAttribute('data-disabled')
  })

  it('opens a submenu', async () => {
    const user = setupUser()
    render(MenubarHost)
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    await user.hover(await screen.findByText('More', overlayText))
    expect(await screen.findByText('Nested', overlayText)).toBeInTheDocument()
  })

  it('has no accessibility violations when closed', async () => {
    const { container } = render(MenubarHost)
    expect(await axe(container)).toHaveNoViolations()
  })
})
