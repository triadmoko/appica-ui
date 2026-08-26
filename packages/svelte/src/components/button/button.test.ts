import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { textSnippet } from '../../test/snippet'
import Button from './button.svelte'

describe('Button', () => {
  it('renders as a button by default', () => {
    render(Button, { props: { children: textSnippet('Click me') } })
    const el = screen.getByRole('button', { name: 'Click me' })
    expect(el.tagName).toBe('BUTTON')
    expect(el).toHaveAttribute('data-slot', 'button')
  })

  it('renders as an anchor when href is set', () => {
    render(Button, { props: { href: '/x', children: textSnippet('Link button') } })
    const el = screen.getByRole('link', { name: 'Link button' })
    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', '/x')
  })

  it('forwards class alongside variant classes', () => {
    render(Button, { props: { class: 'my-button', children: textSnippet('Hi') } })
    const el = screen.getByRole('button', { name: 'Hi' })
    expect(el.className).toContain('my-button')
    expect(el.className).toContain('bg-primary')
    expect(el.className).toContain('text-primary-foreground')
  })

  it('applies size and variant classes', () => {
    render(Button, { props: { variant: 'destructive', size: 'lg', children: textSnippet('Delete') } })
    const el = screen.getByRole('button', { name: 'Delete' })
    expect(el.className).toContain('bg-error')
    expect(el.className).toContain('text-error-foreground')
    expect(el.className).toContain('h-12')
  })

  it('fires onclick when clicked', async () => {
    const user = userEvent.setup()
    const onclick = vi.fn()
    render(Button, { props: { onclick, children: textSnippet('Press') } })

    await user.click(screen.getByRole('button', { name: 'Press' }))
    expect(onclick).toHaveBeenCalledOnce()
  })

  it('does not fire onclick when disabled', async () => {
    const user = userEvent.setup()
    const onclick = vi.fn()
    render(Button, { props: { disabled: true, onclick, children: textSnippet('Press') } })

    await user.click(screen.getByRole('button', { name: 'Press' }))
    expect(onclick).not.toHaveBeenCalled()
  })

  it('activates on keyboard (Enter)', async () => {
    const user = userEvent.setup()
    const onclick = vi.fn()
    render(Button, { props: { onclick, children: textSnippet('Press') } })

    const btn = screen.getByRole('button', { name: 'Press' })
    btn.focus()
    await user.keyboard('{Enter}')
    expect(onclick).toHaveBeenCalledOnce()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(Button, { props: { children: textSnippet('Accessible') } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
