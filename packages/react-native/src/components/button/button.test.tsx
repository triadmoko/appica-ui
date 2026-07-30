import * as React from 'react'
import { render, screen, userEvent } from '@testing-library/react-native'
import { describe, expect, it, jest } from '@jest/globals'
import { Button } from './button'

describe('Button', () => {
  it('renders with the accessible button role', async () => {
    await render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeTruthy()
  })

  it('fires onPress when pressed', async () => {
    const user = userEvent.setup()
    const onPress = jest.fn()
    await render(<Button onPress={onPress}>Press</Button>)

    await user.press(screen.getByRole('button', { name: 'Press' }))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('does not fire onPress when disabled', async () => {
    const user = userEvent.setup()
    const onPress = jest.fn()
    await render(
      <Button disabled onPress={onPress}>
        Press
      </Button>,
    )

    await user.press(screen.getByRole('button', { name: 'Press' }))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('sets accessibilityState.disabled when disabled', async () => {
    await render(<Button disabled>Press</Button>)
    const el = screen.getByRole('button', { name: 'Press' })
    expect(el.props.accessibilityState).toMatchObject({ disabled: true })
  })

  it('applies variant and size styles', async () => {
    await render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    )
    const el = screen.getByRole('button', { name: 'Delete' })
    expect(el).toHaveStyle({ height: 48 })
  })

  it('forwards style and textStyle', async () => {
    await render(
      <Button style={{ marginTop: 10 }} textStyle={{ letterSpacing: 1 }}>
        Styled
      </Button>,
    )
    const el = screen.getByRole('button', { name: 'Styled' })
    expect(el).toHaveStyle({ marginTop: 10 })
    expect(screen.getByText('Styled')).toHaveStyle({ letterSpacing: 1 })
  })
})
