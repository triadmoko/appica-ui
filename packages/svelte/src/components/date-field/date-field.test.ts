import { render, screen } from '@testing-library/svelte'
import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import DateFieldHost from './date-field.test-host.svelte'

const JUN_23 = new CalendarDate(2026, 6, 23)

describe('DateField', () => {
  it('renders month, day, and year segments', () => {
    render(DateFieldHost, { props: { defaultValue: JUN_23 } })
    expect(screen.getByRole('spinbutton', { name: /month/i })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /day/i })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /year/i })).toBeInTheDocument()
  })

  it('populates segments from defaultValue', () => {
    render(DateFieldHost, { props: { defaultValue: JUN_23 } })
    expect(screen.getByRole('spinbutton', { name: /month/i })).toHaveTextContent('6')
    expect(screen.getByRole('spinbutton', { name: /day/i })).toHaveTextContent('23')
    expect(screen.getByRole('spinbutton', { name: /year/i })).toHaveTextContent('2026')
  })

  it('renders a hidden input when name is set', () => {
    const { container } = render(DateFieldHost, { props: { defaultValue: JUN_23, name: 'dob' } })
    const hidden = container.querySelector('input[name="dob"]') as HTMLInputElement
    expect(hidden).not.toBeNull()
    expect(hidden.value).toBe('2026-06-23')
  })

  it('disables interaction when disabled', () => {
    render(DateFieldHost, { props: { disabled: true, defaultValue: JUN_23 } })
    expect(screen.getByRole('group')).toHaveAttribute('aria-disabled', 'true')
  })

  it('applies size classes to the root', () => {
    const { container } = render(DateFieldHost, { props: { size: 'lg' } })
    expect(container.querySelector('[data-slot="date-field"]')?.className).toContain('h-12')
  })

  it('drops the field chrome when unstyled', () => {
    const { container } = render(DateFieldHost, { props: { unstyled: true } })
    const root = container.querySelector('[data-slot="date-field"]')
    expect(root?.className).not.toContain('border')
  })

  it('marks the field invalid inside Field', () => {
    const { container } = render(DateFieldHost, { props: { invalid: true } })
    expect(container.querySelector('[data-slot="date-field"]')).toHaveAttribute('data-invalid')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(DateFieldHost, { props: { defaultValue: JUN_23 } })
    const results = await axe(container)
    expect(results.violations.map((v) => v.id)).toEqual([])
  }, 15_000)
})
