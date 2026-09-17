import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import TabsHost from './tabs.test-host.svelte'
import TabsControlledHost from './tabs.controlled-host.svelte'
import TabsTrigger from './tabs-trigger.svelte'

describe('Tabs', () => {
  it('renders composition with default-active panel visible', () => {
    render(TabsHost)
    expect(screen.getByRole('tablist')).toHaveAttribute('data-slot', 'tabs-list')
    const triggers = screen.getAllByRole('tab')
    expect(triggers).toHaveLength(3)
    expect(triggers[0]).toHaveAttribute('aria-selected', 'true')
    expect(triggers[1]).toHaveAttribute('aria-selected', 'false')

    expect(screen.getByText('Panel One')).toBeVisible()
    expect(screen.queryByText('Panel Two')).toBeNull()
  })

  it('keeps inactive panels in the DOM when keepMounted is set on TabsContent', () => {
    render(TabsHost, { props: { keepMounted: true } })
    const inactive = screen.getByText('Panel Two')
    expect(inactive).toBeInTheDocument()
    expect(inactive).not.toBeVisible()
  })

  it('switches the active panel on click', async () => {
    const user = userEvent.setup()
    render(TabsHost)

    await user.click(screen.getByRole('tab', { name: 'Two' }))

    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'false')
    await waitFor(() => {
      expect(screen.getByText('Panel Two')).toBeVisible()
    })
  })

  it('honors defaultValue', () => {
    render(TabsHost, { props: { defaultValue: 'three' } })
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Panel Three')).toBeVisible()
  })

  it('supports controlled mode', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(TabsControlledHost, { props: { onValueChange } })

    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true')

    await user.click(screen.getByRole('tab', { name: 'Two' }))
    expect(onValueChange).toHaveBeenCalledWith('two')
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true')
  })

  it('does not activate a disabled trigger', async () => {
    const user = userEvent.setup()
    render(TabsHost, { props: { secondDisabled: true } })
    await user.click(screen.getByRole('tab', { name: 'Two' }))
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true')
  })

  it('renders a sliding indicator', () => {
    render(TabsHost)
    expect(document.querySelector('[data-slot="tabs-indicator"]')).not.toBeNull()
  })

  it('navigates horizontally via Arrow keys and activates on Enter', async () => {
    const user = userEvent.setup()
    render(TabsHost)

    const first = screen.getByRole('tab', { name: 'One' })
    first.focus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus()
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Enter}')
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true')
  })

  it('navigates vertically via ArrowDown when orientation="vertical"', async () => {
    const user = userEvent.setup()
    render(TabsHost, { props: { orientation: 'vertical' } })

    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical')

    const first = screen.getByRole('tab', { name: 'One' })
    first.focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus()
  })

  it('applies data-slot attributes on each sub-component', () => {
    render(TabsHost)
    expect(screen.getByRole('tablist').closest('[data-slot="tabs"]')).not.toBeNull()
    expect(screen.getByRole('tablist')).toHaveAttribute('data-slot', 'tabs-list')
    expect(screen.getAllByRole('tab')[0]).toHaveAttribute('data-slot', 'tabs-trigger')
    expect(screen.getByText('Panel One').closest('[data-slot="tabs-content"]')).not.toBeNull()
  })

  it('throws when a sub-component is rendered outside <Tabs>', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(TabsTrigger, { props: { value: 'x' } })).toThrow(/must be rendered inside <Tabs>/)
    spy.mockRestore()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(TabsHost)
    expect(await axe(container)).toHaveNoViolations()
  })
})
