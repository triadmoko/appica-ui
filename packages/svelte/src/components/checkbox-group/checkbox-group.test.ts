import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import CheckboxGroupHost from './checkbox-group.test-host.svelte'

describe('CheckboxGroup', () => {
  it('renders with group role', () => {
    render(CheckboxGroupHost)
    expect(screen.getByRole('group', { name: 'Toppings' })).toBeInTheDocument()
  })

  it('lays out vertically by default', () => {
    render(CheckboxGroupHost, { props: { testId: 'group' } })
    expect(screen.getByTestId('group').className).toContain('flex-col')
  })

  it('lays out horizontally when orientation="horizontal"', () => {
    render(CheckboxGroupHost, { props: { orientation: 'horizontal', testId: 'group' } })
    const group = screen.getByTestId('group')
    expect(group.className).toContain('flex-wrap')
    expect(group.className).not.toContain('flex-col')
  })

  it('reflects defaultValue across child checkboxes', () => {
    render(CheckboxGroupHost, { props: { defaultValue: ['cheese'] } })
    expect(screen.getByRole('checkbox', { name: 'Cheese' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Bacon' })).not.toBeChecked()
  })

  it('fires onValueChange with the new value array on toggle', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(CheckboxGroupHost, { props: { defaultValue: [], onValueChange } })

    await user.click(screen.getByRole('checkbox', { name: 'Cheese' }))
    expect(onValueChange).toHaveBeenCalledWith(['cheese'])
  })

  it('lets consumer class override default display via tailwind-merge', () => {
    render(CheckboxGroupHost, { props: { class: 'grid grid-cols-2', testId: 'group' } })
    const group = screen.getByTestId('group')
    expect(group.className).toContain('grid')
    expect(group.className).toContain('grid-cols-2')
    expect(group.className).not.toMatch(/(^|\s)flex(\s|$)/)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(CheckboxGroupHost, { props: { defaultValue: ['cheese'] } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
