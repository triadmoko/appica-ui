import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import CollapsibleHost from './collapsible.test-host.svelte'
import CollapsibleControlledHost from './collapsible.controlled-host.svelte'

describe('Collapsible', () => {
  it('renders trigger with data-slot', () => {
    render(CollapsibleHost)
    const trigger = screen.getByRole('button', { name: 'Toggle' })
    expect(trigger.getAttribute('data-slot')).toBe('collapsible-trigger')
  })

  it('defaults closed: panel not in the DOM', () => {
    render(CollapsibleHost)
    expect(screen.queryByText('Panel body')).toBeNull()
  })

  it('opens on trigger click and closes on a second click', async () => {
    const user = userEvent.setup()
    render(CollapsibleHost)
    const trigger = screen.getByRole('button', { name: 'Toggle' })

    await user.click(trigger)
    const panel = await screen.findByText('Panel body')
    expect(panel.closest('[data-slot="collapsible-content"]')).not.toBeNull()
    expect(trigger.getAttribute('data-panel-open')).not.toBeNull()

    await user.click(trigger)
    await waitFor(() => {
      expect(screen.queryByText('Panel body')).toBeNull()
    })
  })

  it('respects defaultOpen', () => {
    render(CollapsibleHost, { props: { defaultOpen: true } })
    expect(screen.getByText('Panel body')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Toggle' }).getAttribute('data-panel-open')).not.toBeNull()
  })

  it('disabled prevents toggling', async () => {
    const user = userEvent.setup()
    render(CollapsibleHost, { props: { disabled: true } })
    const trigger = screen.getByRole('button', { name: 'Toggle' })
    expect(trigger.getAttribute('data-disabled')).not.toBeNull()
    await user.click(trigger)
    expect(screen.queryByText('Panel body')).toBeNull()
  })

  it('keepMounted leaves the panel in the DOM when closed with data-closed', () => {
    render(CollapsibleHost, { props: { keepMounted: true } })
    const panel = screen.getByText('Panel body').closest('[data-slot="collapsible-content"]') as HTMLElement
    expect(panel).not.toBeNull()
    expect(panel.getAttribute('data-closed')).not.toBeNull()
  })

  it('hiddenUntilFound leaves the panel in the DOM when closed', () => {
    render(CollapsibleHost, { props: { hiddenUntilFound: true } })
    expect(screen.getByText('Panel body')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="collapsible-content"]')).not.toBeNull()
  })

  it('controlled mode: onOpenChange fires with the next open state', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(CollapsibleControlledHost, { props: { onOpenChange } })

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    await screen.findByText('Panel body')
  })

  it('forwards class on each part', async () => {
    const user = userEvent.setup()
    render(CollapsibleHost, {
      props: { rootClass: 'root-cls', triggerClass: 'trigger-cls', contentClass: 'content-cls' },
    })

    const trigger = screen.getByRole('button', { name: 'Toggle' })
    expect(trigger.className).toContain('trigger-cls')
    expect(trigger.className).toContain('cursor-pointer')

    await user.click(trigger)
    const panel = (await screen.findByText('Panel body')).closest('[data-slot="collapsible-content"]') as HTMLElement
    expect(panel.className).toContain('content-cls')
    expect(panel.className).toContain('overflow-hidden')
  })

  it('has no a11y violations when open', async () => {
    const { container } = render(CollapsibleHost, { props: { defaultOpen: true } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
