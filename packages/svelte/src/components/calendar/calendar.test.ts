import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { CalendarDate } from '@internationalized/date'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import CalendarHost from './calendar.test-host.svelte'

const MAY_15 = new CalendarDate(2026, 5, 15)

describe('Calendar', () => {
  it('renders a grid with day buttons for the given month', () => {
    render(CalendarHost)
    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /May 15, 2026/ })).toBeInTheDocument()
  })

  it('selects a date when a day is clicked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(CalendarHost, { props: { onValueChange } })
    await user.click(screen.getByRole('button', { name: /May 20, 2026/ }))
    expect(onValueChange).toHaveBeenCalled()
    const [selected] = onValueChange.mock.calls[0]!
    expect(selected).toBeInstanceOf(CalendarDate)
    expect((selected as CalendarDate).day).toBe(20)
  })

  it('reflects the controlled selected date with aria-selected', () => {
    render(CalendarHost, { props: { value: MAY_15 } })
    const cell = screen.getByRole('gridcell', { selected: true })
    expect(cell).toHaveAttribute('data-value', '2026-05-15')
  })

  it('applies size variant via --cell-size CSS variable on the root', () => {
    const { rerender } = render(CalendarHost, { props: { size: 'sm' } })
    expect(document.querySelector('[data-slot="calendar"]')?.className).toContain('--cell-size:--spacing(6)')

    rerender({ size: 'lg' })
    expect(document.querySelector('[data-slot="calendar"]')?.className).toContain('--cell-size:--spacing(10)')
  })

  it('renders prev/next navigation buttons that change months', async () => {
    const user = userEvent.setup()
    render(CalendarHost)
    expect(screen.getByRole('button', { name: /May 15, 2026/ })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^next$/i }))
    expect(screen.getByRole('button', { name: /June 15, 2026/ })).toBeInTheDocument()
  })

  it('selects a range when type is range', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(CalendarHost, { props: { type: 'range', onValueChange } })

    await user.click(screen.getByRole('button', { name: /May 10, 2026/ }))
    await user.click(screen.getByRole('button', { name: /May 20, 2026/ }))

    expect(onValueChange).toHaveBeenCalled()
    const last = onValueChange.mock.calls.at(-1)![0] as { from?: CalendarDate; to?: CalendarDate }
    expect(last.from?.day).toBe(10)
    expect(last.to?.day).toBe(20)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(CalendarHost)
    const results = await axe(container)
    expect(results.violations.map((v) => v.id)).toEqual([])
  }, 15_000)
})
