import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { createHandle } from '../../internal/overlay-handle.svelte'
import DrawerHost from './drawer.test-host.svelte'
import { attachDrawerGesture } from './drawer-gesture'
import { Drawer } from './index'

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 })

describe('Drawer', () => {
  it('tags the trigger with data-slot', () => {
    render(DrawerHost)
    expect(screen.getByRole('button', { name: 'Open drawer' }).getAttribute('data-slot')).toBe('drawer-trigger')
  })

  it('does not render content before being opened', () => {
    render(DrawerHost)
    expect(screen.queryByText('Body content')).toBeNull()
  })

  it('opens from the default side and exposes a labeled dialog', async () => {
    const user = setupUser()
    render(DrawerHost)

    await user.click(screen.getByRole('button', { name: 'Open drawer' }))

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAccessibleName('Edit profile')
    expect(dialog).toHaveAccessibleDescription('Update your details below.')
    expect(dialog.getAttribute('data-slot')).toBe('drawer-popup')
    expect(dialog).toHaveAttribute('data-side', 'bottom')

    const title = screen.getByText('Edit profile')
    expect(title.getAttribute('data-slot')).toBe('drawer-title')
  })

  it.each(['top', 'left', 'right'] as const)('opens from side=%s', async (side) => {
    const user = setupUser()
    render(DrawerHost, { props: { side } })
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('data-side', side)

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('forwards class to the content popup', async () => {
    const user = setupUser()
    render(DrawerHost, { props: { contentClass: 'w-200' } })
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog.className).toContain('w-200')
  })

  it('closes from the built-in close button', async () => {
    const user = setupUser()
    render(DrawerHost)
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    await screen.findByRole('dialog')
    await user.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('closes when a DrawerClose action is clicked', async () => {
    const user = setupUser()
    render(DrawerHost)
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    await screen.findByRole('dialog')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('closes on Escape', async () => {
    const user = setupUser()
    render(DrawerHost)
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('hides the built-in close button when closeButton is false', async () => {
    const user = setupUser()
    render(DrawerHost, { props: { closeButton: false } })
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    await screen.findByRole('dialog')
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull()
  })

  it('omits the backdrop when backdrop is false', async () => {
    const user = setupUser()
    render(DrawerHost, { props: { backdrop: false } })
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    await screen.findByRole('dialog')
    expect(document.querySelector('[data-slot="drawer-backdrop"]')).toBeNull()
    expect(document.querySelector('[data-slot="drawer-popup"]')).not.toHaveAttribute('data-frame')
  })

  it('frames the popup by default and drops the frame when frame is false', async () => {
    const user = setupUser()
    const { unmount } = render(DrawerHost)
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    await screen.findByRole('dialog')
    expect(document.querySelector('[data-slot="drawer-popup"]')).toHaveAttribute('data-frame')
    unmount()

    render(DrawerHost, { props: { frame: false } })
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    await screen.findByRole('dialog')
    expect(document.querySelector('[data-slot="drawer-popup"]')).not.toHaveAttribute('data-frame')
  })

  it('turns the backdrop off for nested drawers by default', async () => {
    const user = setupUser()
    render(DrawerHost, { props: { nested: true } })
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    await screen.findByText('Body content')
    expect(document.querySelectorAll('[data-slot="drawer-backdrop"]')).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'Nested' }))
    await screen.findByText('Nested body')
    expect(document.querySelectorAll('[data-slot="drawer-backdrop"]')).toHaveLength(1)
    expect(document.querySelectorAll('[data-slot="drawer-popup"][data-frame]')).toHaveLength(1)
    expect(document.querySelector('[data-slot="drawer-popup"][data-nested-drawer-open]')).not.toBeNull()
  })

  it('snaps a bottom drawer toward the next point on an upward flick', () => {
    const node = document.createElement('div')
    Object.defineProperty(node, 'offsetHeight', { value: 500 })
    document.body.append(node)
    const onSnap = vi.fn()
    const onDismiss = vi.fn()
    const detach = attachDrawerGesture(node, {
      get enabled() {
        return true
      },
      get side() {
        return 'bottom'
      },
      get snapPoints() {
        return [0.4, 1]
      },
      get snapToSequentialPoints() {
        return false
      },
      get activeSnapPoint() {
        return 0.4
      },
      get snapOffset() {
        return 300
      },
      onMove: vi.fn(),
      onDismiss,
      onSnap,
      onCancel: vi.fn(),
    })
    node.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0, clientX: 0, clientY: 400, pointerId: 1 }))
    node.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, button: 0, clientX: 0, clientY: 380, pointerId: 1 }))
    node.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, button: 0, clientX: 0, clientY: 40, pointerId: 1 }))
    node.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, button: 0, clientX: 0, clientY: 40, pointerId: 1 }))
    expect(onDismiss).not.toHaveBeenCalled()
    expect(onSnap).toHaveBeenCalledWith(1)
    detach()
    node.remove()
  })

  it('opens a snap-point drawer from the first point', async () => {
    const user = setupUser()
    render(DrawerHost, { props: { snapPoints: [0.4, 1] } })
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('data-side', 'bottom')
    expect(dialog.className).toContain('h-[calc(100dvh-1rem)]')
    const style = dialog.getAttribute('style') ?? ''
    expect(style).toMatch(/--drawer-snap-point-offset:\s*-?[1-9]/)
  })

  it('does not capture pointer on interactive children', () => {
    const node = document.createElement('div')
    const button = document.createElement('button')
    button.textContent = 'Rename workspace'
    node.append(button)
    document.body.append(node)
    const capture = vi.fn()
    node.setPointerCapture = capture
    const detach = attachDrawerGesture(node, {
      get enabled() {
        return true
      },
      get side() {
        return 'right'
      },
      get snapPoints() {
        return undefined
      },
      get snapToSequentialPoints() {
        return false
      },
      get activeSnapPoint() {
        return null
      },
      get snapOffset() {
        return 0
      },
      onMove: vi.fn(),
      onDismiss: vi.fn(),
      onSnap: vi.fn(),
      onCancel: vi.fn(),
    })
    button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0, clientX: 8, clientY: 8, pointerId: 1 }))
    button.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, button: 0, clientX: 40, clientY: 8, pointerId: 1 }))
    expect(capture).not.toHaveBeenCalled()
    detach()
    node.remove()
  })

  it('sets dir on the popup from DirectionProvider', async () => {
    const user = setupUser()
    render(DrawerHost, { props: { dir: 'rtl' } })
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('dir', 'rtl')
  })

  it('positions a right-side drawer as a full-height panel', async () => {
    const user = setupUser()
    render(DrawerHost, { props: { side: 'right' } })
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog.className).toContain('h-full')
    const panel = document.querySelector('[data-slot="drawer-panel"]')
    expect(panel?.className).toContain('ps-4')
    const viewport = document.querySelector('[data-slot="drawer-viewport"]')
    expect(viewport).toBeInstanceOf(HTMLElement)
    expect((viewport as HTMLElement).scrollLeft).toBe(0)
  })

  it('exposes createHandle', async () => {
    expect(typeof Drawer.createHandle).toBe('function')
    const handle = createHandle()
    render(DrawerHost, { props: { handle } })
    handle.open = true
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })

  it('has no accessibility violations when closed', async () => {
    const { container } = render(DrawerHost)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations when open', async () => {
    const user = setupUser()
    render(DrawerHost)
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    const dialog = await screen.findByRole('dialog')
    expect(await axe(dialog)).toHaveNoViolations()
  })
})
