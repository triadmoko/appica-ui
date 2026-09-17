import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { createHandle } from '../../internal/overlay-handle.svelte'
import DialogHost from './dialog.test-host.svelte'
import { Dialog } from './index'

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 })

describe('Dialog', () => {
  it('tags the trigger with data-slot', () => {
    render(DialogHost)
    expect(screen.getByRole('button', { name: 'Open dialog' }).getAttribute('data-slot')).toBe('dialog-trigger')
  })

  it('does not render content before being opened', () => {
    render(DialogHost)
    expect(screen.queryByText('Body content')).toBeNull()
  })

  it('opens on trigger click and exposes a labeled dialog', async () => {
    const user = setupUser()
    render(DialogHost)

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAccessibleName('Update profile')
    expect(dialog).toHaveAccessibleDescription('Make changes to your account.')
    expect(dialog.getAttribute('data-slot')).toBe('dialog-popup')
  })

  it('closes when the built-in close button is clicked', async () => {
    const user = setupUser()
    render(DialogHost)

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByRole('dialog')

    await user.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('closes when a DialogClose action is clicked', async () => {
    const user = setupUser()
    render(DialogHost)

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByRole('dialog')

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('closes on Escape', async () => {
    const user = setupUser()
    render(DialogHost)

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByRole('dialog')

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('hides the built-in close button when closeButton is false', async () => {
    const user = setupUser()
    render(DialogHost, { props: { closeButton: false } })

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByRole('dialog')

    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull()
  })

  it('renders a backdrop by default', async () => {
    const user = setupUser()
    render(DialogHost)

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByRole('dialog')

    expect(document.querySelector('[data-slot="dialog-backdrop"]')).not.toBeNull()
  })

  it('omits the backdrop when backdrop is false', async () => {
    const user = setupUser()
    render(DialogHost, { props: { backdrop: false } })

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByRole('dialog')

    expect(document.querySelector('[data-slot="dialog-backdrop"]')).toBeNull()
  })

  it('drops the frame when backdrop is off', async () => {
    const user = setupUser()
    render(DialogHost, { props: { backdrop: false, frame: true } })

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByRole('dialog')

    expect(document.querySelector('[data-slot="dialog-popup"]')).not.toHaveAttribute('data-frame')
  })

  it('exposes createHandle and opens programmatically', async () => {
    expect(typeof Dialog.createHandle).toBe('function')
    const handle = createHandle()
    render(DialogHost, { props: { handle } })
    expect(screen.queryByRole('dialog')).toBeNull()
    handle.open = true
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })

  it('opens when defaultOpen is true', () => {
    render(DialogHost, { props: { defaultOpen: true } })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('forwards class to the content popup', async () => {
    const user = setupUser()
    render(DialogHost, { props: { contentClass: 'w-200' } })

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    const dialog = await screen.findByRole('dialog')

    expect(dialog.className).toContain('w-200')
    expect(dialog.className).not.toContain('w-150')
  })

  it('keeps the dialog open on a backdrop click when disablePointerDismissal is set', async () => {
    const user = setupUser()
    render(DialogHost, { props: { disablePointerDismissal: true } })

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByRole('dialog')

    await user.click(document.querySelector('[data-slot="dialog-backdrop"]')!)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('retracts the parent and hides the nested backdrop', async () => {
    const user = setupUser()
    render(DialogHost, { props: { nested: true } })

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    await screen.findByText('Body content')

    await user.click(screen.getByRole('button', { name: 'Nested' }))
    await screen.findByText('Nested body')

    const popups = document.querySelectorAll('[data-slot="dialog-popup"]')
    expect(popups[0]).toHaveAttribute('data-nested-open')

    const backdrops = document.querySelectorAll('[data-slot="dialog-backdrop"]')
    expect(backdrops).toHaveLength(2)
    expect(backdrops[1]).toHaveAttribute('data-nested')
    expect(backdrops[1].className).toContain('data-nested:hidden')
  })

  it('has no accessibility violations when closed', async () => {
    const { container } = render(DialogHost)
    expect(await axe(container)).toHaveNoViolations()
  })
})
