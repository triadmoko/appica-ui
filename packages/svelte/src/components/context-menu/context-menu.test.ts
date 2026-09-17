import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import ContextMenuHost from './context-menu.test-host.svelte'

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 })
const overlayText = { hidden: true as const }

async function openMenu(props?: Record<string, unknown>) {
  const user = setupUser()
  render(ContextMenuHost, props ? { props } : undefined)
  await user.pointer({ keys: '[MouseRight]', target: screen.getByTestId('trigger') })
  return user
}

describe('ContextMenu', () => {
  it('does not render content before being opened', () => {
    render(ContextMenuHost)
    expect(screen.queryByText('Profile')).toBeNull()
  })

  it('opens on right click and shows items', async () => {
    await openMenu()
    const item = await screen.findByText('Profile', overlayText)
    expect(item.closest('[data-slot="context-menu-item"]')).toHaveAttribute('role', 'menuitem')
  })

  it('stamps data-orientation="vertical" on items', async () => {
    await openMenu()
    const item = (await screen.findByText('Profile', overlayText)).closest('[data-slot="context-menu-item"]')
    expect(item).toHaveAttribute('data-orientation', 'vertical')
  })

  it('closes on item click', async () => {
    const user = await openMenu()
    await user.click(await screen.findByText('Profile', overlayText))
    await waitFor(() => {
      expect(screen.queryByText('Profile', overlayText)).toBeNull()
    })
  })

  it('keeps the menu open when closeOnClick is false', async () => {
    const user = await openMenu({ closeOnClick: false })
    await user.click(await screen.findByText('Profile', overlayText))
    expect(await screen.findByText('Profile', overlayText)).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = await openMenu()
    await screen.findByText('Profile', overlayText)
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByText('Profile', overlayText)).toBeNull()
    })
  })

  it('propagates size to items via navigationLinkVariants', async () => {
    await openMenu({ size: 'lg' })
    const item = (await screen.findByText('Profile', overlayText)).closest('[data-slot="context-menu-item"]')
    expect(item?.className).toContain('text-base')
  })

  it('renders the popup with size-driven radius', async () => {
    await openMenu({ size: 'sm' })
    const item = await screen.findByText('Profile', overlayText)
    const popup = item.closest('[data-slot="context-menu-content"]') as HTMLElement
    expect(popup).not.toBeNull()
    expect(popup.className).toContain('rounded-md')
    expect(popup.className).toContain('bg-background')
  })

  it('renders a disabled item with data-disabled', async () => {
    await openMenu()
    const disabled = (await screen.findByText('Disabled', overlayText)).closest('[data-slot="context-menu-item"]')
    expect(disabled?.getAttribute('data-disabled')).not.toBeNull()
  })

  it('renders a LinkItem as an anchor with href', async () => {
    await openMenu()
    const link = (await screen.findByText('Docs', overlayText)).closest('a') as HTMLAnchorElement
    expect(link).not.toBeNull()
    expect(link.getAttribute('href')).toBe('https://example.com')
  })

  it('keeps the menu open when a radio item is selected', async () => {
    const user = await openMenu()
    await user.click(await screen.findByText('Two', overlayText))
    const radio = (await screen.findByText('Two', overlayText)).closest('[data-slot="context-menu-radio-item"]')
    expect(radio).toHaveAttribute('aria-checked', 'true')
  })

  it('keeps the menu open when a checkbox item is toggled', async () => {
    const user = await openMenu()
    await user.click(await screen.findByText('Notifications', overlayText))
    const checkbox = (await screen.findByText('Notifications', overlayText)).closest(
      '[data-slot="context-menu-checkbox-item"]',
    )
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('opens a submenu', async () => {
    const user = await openMenu()
    await user.hover(await screen.findByText('More', overlayText))
    expect(await screen.findByText('Nested', overlayText)).toBeInTheDocument()
  })

  it('has no accessibility violations when closed', async () => {
    const { container } = render(ContextMenuHost)
    expect(await axe(container)).toHaveNoViolations()
  })
})
