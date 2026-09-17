import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import FormHost from './form.test-host.svelte'
import FormValidateHost from './form.validate-host.svelte'

describe('Form', () => {
  it('renders a native form element', () => {
    render(FormHost)

    const form = screen.getByRole('form', { name: 'signup' })
    expect(form.tagName).toBe('FORM')
    expect(form).toHaveAttribute('data-slot', 'form')
  })

  it('forwards onsubmit', async () => {
    const onsubmit = vi.fn((event: SubmitEvent) => event.preventDefault())
    render(FormHost, { props: { onsubmit } })

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onsubmit).toHaveBeenCalledTimes(1)
  })

  it('calls onFormSubmit with collected values after a valid submit', async () => {
    const onFormSubmit = vi.fn()
    const user = userEvent.setup()
    render(FormHost, { props: { useFields: true, onFormSubmit } })

    await user.type(screen.getByLabelText('Email'), 'you@example.com')
    await user.type(screen.getByLabelText('Name'), 'Ada')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onFormSubmit).toHaveBeenCalledTimes(1)
    expect(onFormSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'you@example.com', name: 'Ada' }),
    )
  })

  it('blocks onFormSubmit when a field validate fails', async () => {
    const onFormSubmit = vi.fn()
    const user = userEvent.setup()
    render(FormValidateHost, { props: { onFormSubmit } })

    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onFormSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(FormHost)
    expect(await axe(container)).toHaveNoViolations()
  })
})
