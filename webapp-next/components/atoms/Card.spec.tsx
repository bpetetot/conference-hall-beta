import { render, screen } from '@testing-library/react'

import Card from './Card'

describe('Card component', () => {
  test('should render children', () => {
    render(<Card>Text</Card>)
    expect(screen.getByText('Text')).toBeVisible()
  })

  describe('withPadding prop', () => {
    test('should set a padding by default', () => {
      const { container } = render(<Card>Text</Card>)
      expect(container.firstChild).toHaveClass('px-5')
    })

    test('should not set a padding when withPadding is false', () => {
      const { container } = render(<Card withPadding={false}>Text</Card>)
      expect(container.firstChild).not.toHaveClass('px-5')
    })
  })
})
