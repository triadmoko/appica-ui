import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import ToastHost from './toast.test-host.svelte'
import { createToastManager, type ToastPosition } from './toast-manager.svelte'

describe('Toast', () => {
  it('renders title and description after add()', async () => {
    const user = userEvent.setup()
    render(ToastHost)
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    expect(await screen.findByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('World')).toBeInTheDocument()
  })

  it('dismisses on close', async () => {
    const user = userEvent.setup()
    render(ToastHost, { props: { timeout: 0 } })
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    await screen.findByText('Hello')
    const close = document.querySelector<HTMLButtonElement>('[data-slot="toast-close"]')
    expect(close).toHaveAttribute('aria-label', 'Dismiss')
    await user.click(close!)
    await waitFor(
      () => {
        expect(screen.queryByText('Hello')).toBeNull()
      },
      { timeout: 2000 },
    )
  })

  it('applies position classes', async () => {
    const user = userEvent.setup()
    const position: ToastPosition = 'top-left'
    render(ToastHost, { props: { position, timeout: 0 } })
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    await screen.findByText('Hello')
    expect(document.querySelector('[data-slot="toast-viewport"]')).toHaveAttribute('data-position', position)
    expect(document.querySelector('[data-slot="toast"]')).toHaveAttribute('data-position', position)
  })

  it('renders a progress bar when progress is enabled', async () => {
    const user = userEvent.setup()
    render(ToastHost, { props: { progress: true, timeout: 10000 } })
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    await screen.findByText('Hello')
    expect(document.querySelector('[data-slot="toast-progress"]')).not.toBeNull()
  })

  it('omits the progress bar by default', async () => {
    const user = userEvent.setup()
    render(ToastHost, { props: { timeout: 10000 } })
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    await screen.findByText('Hello')
    expect(document.querySelector('[data-slot="toast-progress"]')).toBeNull()
  })

  it('sizes the toast to its content instead of a fixed 4.5rem shell', async () => {
    const user = userEvent.setup()
    render(ToastHost, { props: { timeout: 0, withAction: true } })
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    await screen.findByText('Hello')
    expect(screen.getByRole('button', { name: 'Do it' })).toBeInTheDocument()
    const toast = document.querySelector('[data-slot="toast"]') as HTMLElement
    expect(toast.getAttribute('style')).not.toContain('4.5rem')
  })

  it('renders a built-in status icon', async () => {
    const user = userEvent.setup()
    render(ToastHost, { props: { timeout: 0, icon: 'success' } })
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    await screen.findByText('Hello')
    expect(document.querySelector('[data-toast-status="success"]')).not.toBeNull()
  })

  it('renders a thumbnail when data.thumbnail is set', async () => {
    const user = userEvent.setup()
    render(ToastHost, { props: { timeout: 0, thumbnail: 'https://example.com/photo.jpg' } })
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    await screen.findByText('Hello')
    expect(document.querySelector('[data-slot="thumbnail"]')).not.toBeNull()
  })

  it('updates a promise toast when the work resolves', async () => {
    const user = userEvent.setup()
    render(ToastHost, { props: { timeout: 0, withPromise: true } })
    await user.click(screen.getByRole('button', { name: 'Promise toast' }))
    expect(await screen.findByText('Loading')).toBeInTheDocument()
    expect(await screen.findByText('Done')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText('Loading')).toBeNull()
    })
  })

  it('shows a progress bar when the toast opts in', async () => {
    const user = userEvent.setup()
    render(ToastHost, { props: { timeout: 10000, toastProgress: true } })
    await user.click(screen.getByRole('button', { name: 'Show toast' }))
    await screen.findByText('Hello')
    expect(document.querySelector('[data-slot="toast-progress"]')).not.toBeNull()
  })

  it('has no accessibility violations when idle', async () => {
    const { container } = render(ToastHost)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('createToastManager', () => {
  it('keeps a toast listed after close() until remove()', () => {
    const manager = createToastManager()
    const id = manager.add({ title: 'X', timeout: 0 })
    expect(manager.toasts).toHaveLength(1)
    manager.close(id)
    expect(manager.toasts).toHaveLength(1)
    expect(manager.toasts[0]?.closing).toBe(true)
    manager.remove(id)
    expect(manager.toasts).toHaveLength(0)
  })

  it('drops a toast immediately from remove()', () => {
    const manager = createToastManager()
    const id = manager.add({ title: 'X', timeout: 0 })
    manager.remove(id)
    expect(manager.toasts).toHaveLength(0)
  })
})
