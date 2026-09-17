import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { createHandle } from '../../internal/overlay-handle.svelte'
import AlertDialogHost from './alert-dialog.test-host.svelte'
import { AlertDialog } from './index'

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 })

describe('AlertDialog', () => {
  it('tags the trigger with data-slot', () => {
    render(AlertDialogHost)
    expect(screen.getByRole('button', { name: 'Delete' }).getAttribute('data-slot')).toBe('alert-dialog-trigger')
  })

  it('does not render content before being opened', () => {
    render(AlertDialogHost)
    expect(screen.queryByText('Everything in this project will be removed.')).toBeNull()
  })

  it('opens as role=alertdialog with no default close button', async () => {
    const user = setupUser()
    render(AlertDialogHost)

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    const dialog = await screen.findByRole('alertdialog')
    expect(dialog).toHaveAccessibleName('Delete project')
    expect(dialog).toHaveAccessibleDescription('This action cannot be undone.')
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull()

    const title = screen.getByText('Delete project')
    expect(title.getAttribute('data-slot')).toBe('alert-dialog-title')
    expect(title.className).toContain('text-foreground-intense')
    expect(title.className).toContain('font-semibold')
  })

  it('forwards class to the content popup', async () => {
    const user = setupUser()
    render(AlertDialogHost, { props: { contentClass: 'w-200' } })

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    const dialog = await screen.findByRole('alertdialog')

    expect(dialog.getAttribute('data-slot')).toBe('alert-dialog-popup')
    expect(dialog.className).toContain('w-200')
    expect(dialog.className).not.toContain('w-100')
  })

  it('does not render a built-in close button', async () => {
    const user = setupUser()
    render(AlertDialogHost)

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')

    expect(document.querySelector('[data-slot="alert-dialog-close-button"]')).toBeNull()
  })

  it('omits the backdrop when backdrop is false', async () => {
    const user = setupUser()
    render(AlertDialogHost, { props: { backdrop: false } })

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')

    expect(document.querySelector('[data-slot="alert-dialog-backdrop"]')).toBeNull()
  })

  it('frames the popup by default and drops the frame when frame is false', async () => {
    const user = setupUser()
    const { unmount } = render(AlertDialogHost)

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')
    expect(document.querySelector('[data-slot="alert-dialog-popup"]')).toHaveAttribute('data-frame')

    unmount()
    render(AlertDialogHost, { props: { frame: false } })

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')
    expect(document.querySelector('[data-slot="alert-dialog-popup"]')).not.toHaveAttribute('data-frame')
  })

  it('drops the frame when the backdrop is off, even if frame is set', async () => {
    const user = setupUser()
    render(AlertDialogHost, { props: { backdrop: false, frame: true } })

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')

    expect(document.querySelector('[data-slot="alert-dialog-popup"]')).not.toHaveAttribute('data-frame')
  })

  it('does not close on an outside click', async () => {
    const user = setupUser()
    render(AlertDialogHost)

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')

    await user.click(document.body)
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()

    await user.click(document.querySelector('[data-slot="alert-dialog-backdrop"]')!)
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  })

  it('closes from a footer close button', async () => {
    const user = setupUser()
    render(AlertDialogHost)

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('alertdialog')

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeNull()
    })
  })

  it('hides the nested backdrop and flattens the framed popup', async () => {
    const user = setupUser()
    render(AlertDialogHost, { props: { nested: true } })

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByText('Nested body')

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    const alert = await screen.findByRole('alertdialog')

    const backdrop = document.querySelector('[data-slot="alert-dialog-backdrop"]')
    expect(backdrop).toHaveAttribute('data-nested')
    expect(backdrop?.className).toContain('data-nested:hidden')
    expect(alert.className).toContain('data-nested:border-border-overlay')
  })

  it('exposes createHandle', async () => {
    expect(typeof AlertDialog.createHandle).toBe('function')
    const handle = createHandle()
    render(AlertDialogHost, { props: { handle } })
    handle.open = true
    expect(await screen.findByRole('alertdialog')).toBeInTheDocument()
  })

  it('has no accessibility violations when closed', async () => {
    const { container } = render(AlertDialogHost)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations when open', async () => {
    const user = setupUser()
    render(AlertDialogHost)

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    const dialog = await screen.findByRole('alertdialog')

    expect(await axe(dialog)).toHaveNoViolations()
  })
})
