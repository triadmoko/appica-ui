import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import CardHost from './card.test-host.svelte'

function getRoot(container: HTMLElement) {
  return container.querySelector('[data-slot="card"]') as HTMLElement
}

describe('Card', () => {
  it('renders a div root with data-slot by default', () => {
    const { container } = render(CardHost)
    const root = getRoot(container)
    expect(root.tagName).toBe('DIV')
    expect(root).toHaveAttribute('data-frame', 'none')
    expect(root).toHaveAttribute('data-inset')
    expect(container.querySelector('[data-slot="card-content"]')).not.toBeNull()
  })

  it('switches the root tag via el', () => {
    const { container } = render(CardHost, { props: { el: 'article' } })
    expect(getRoot(container).tagName).toBe('ARTICLE')
  })

  it('renders the root as a form via el', () => {
    const { container } = render(CardHost, { props: { el: 'form' } })
    expect(getRoot(container).tagName).toBe('FORM')
  })

  it('renders compound parts', () => {
    render(CardHost)
    expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'card-title')
    expect(screen.getByText('Description')).toHaveAttribute('data-slot', 'card-description')
    expect(screen.getByText('Footer').closest('[data-slot="card-footer"]')).not.toBeNull()
    expect(document.querySelector('[data-slot="card-media"]')).not.toBeNull()
    expect(document.querySelector('[data-slot="card-header"]')).not.toBeNull()
  })

  it.each([
    [true, 'solid'],
    ['solid' as const, 'solid'],
    ['glass' as const, 'glass'],
  ])('maps frame=%s to data-frame="%s"', (frame, expected) => {
    const { container } = render(CardHost, { props: { frame } })
    expect(getRoot(container)).toHaveAttribute('data-frame', expected)
  })

  it('drops data-inset when inset is false', () => {
    const { container } = render(CardHost, { props: { inset: false } })
    expect(getRoot(container)).not.toHaveAttribute('data-inset')
  })

  it('forwards class on the root and contentProps on the content wrapper', () => {
    const { container } = render(CardHost, {
      props: { class: 'w-80', contentProps: { class: 'sm:flex-row', 'data-testid': 'content' } },
    })

    expect(getRoot(container).className).toContain('w-80')
    expect(screen.getByTestId('content')).toHaveClass('sm:flex-row')
    expect(container.querySelector('[data-slot="card-content"]')).toBe(screen.getByTestId('content'))
  })

  it('renders the title as h3 by default and honors el', () => {
    const { unmount } = render(CardHost)
    expect(screen.getByRole('heading', { level: 3, name: 'Title' })).toBeInTheDocument()
    unmount()

    render(CardHost, { props: { titleEl: 'h2' } })
    expect(screen.getByRole('heading', { level: 2, name: 'Title' })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(CardHost, { props: { frame: 'glass' } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
