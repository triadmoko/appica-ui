import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import AutocompleteHost from './autocomplete.test-host.svelte'

const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 })
const overlay = { hidden: true as const }

describe('Autocomplete', () => {
  it('tags the input group with data-slot', () => {
    render(AutocompleteHost)
    const input = screen.getByRole('combobox')
    expect(input.closest('[data-slot="autocomplete-input"]')).not.toBeNull()
  })

  it('does not render the popup before opening', () => {
    render(AutocompleteHost)
    expect(screen.queryByText('SvelteKit')).toBeNull()
  })

  it('opens on toggle and selects an item', async () => {
    const user = setupUser()
    render(AutocompleteHost)
    await user.click(screen.getByRole('button', { name: 'Toggle popup' }))
    await user.click(await screen.findByText('SvelteKit', overlay))
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toHaveValue('SvelteKit')
    })
  })

  it('does not render the toggle when icon is false', () => {
    render(AutocompleteHost, { props: { icon: false } })
    expect(screen.queryByRole('button', { name: 'Toggle popup' })).toBeNull()
  })

  it('shows the clear control when a value is present', async () => {
    const user = setupUser()
    render(AutocompleteHost, { props: { defaultValue: 'Next.js', clearable: true } })
    const clearControl = document.querySelector('[data-slot="autocomplete-clear"]') as HTMLElement
    expect(clearControl).toBeTruthy()
    await user.click(clearControl)
    await waitFor(() => {
      expect(document.querySelector('[data-slot="autocomplete-clear"]')).toBeNull()
    })
  })

  it('renders status chrome inside the popup', async () => {
    const user = setupUser()
    render(AutocompleteHost, { props: { status: 'Loading…' } })
    await user.click(screen.getByRole('button', { name: 'Toggle popup' }))
    expect(await screen.findByText('Loading…', overlay)).toBeInTheDocument()
    expect(screen.getByText('Loading…', overlay).closest('[data-slot="autocomplete-status"]')).not.toBeNull()
  })

  it('marks the input invalid inside Field', () => {
    render(AutocompleteHost, { props: { invalid: true } })
    expect(screen.getByRole('combobox').closest('[data-slot="autocomplete-input"]')).toHaveAttribute('data-invalid')
  })

  it('has no accessibility violations when closed', async () => {
    const { container } = render(AutocompleteHost)
    expect(await axe(container)).toHaveNoViolations()
  })
})
