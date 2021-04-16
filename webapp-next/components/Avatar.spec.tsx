import { render, screen } from '@testing-library/react'

import Avatar from './Avatar'

describe('Avatar component', () => {
  test('should render the complete avatar', () => {
    render(<Avatar src="image" name="name" />)
    expect(screen.getByAltText('name avatar')).toBeVisible()
  })

  test('should render the avatar with only name initial', () => {
    render(<Avatar name="name" />)
    expect(screen.getByText('n')).toBeVisible()
  })

  test('should render the avatar placeholder', () => {
    const { container } = render(<Avatar />)
    expect(container.firstChild).toHaveClass('block')
  })

  describe('size properties', () => {
    test('should render size small', () => {
      const { container } = render(<Avatar size="s" />)
      expect(container.firstChild).toHaveClass('h-8')
    })

    test('should render size medium', () => {
      const { container } = render(<Avatar size="m" />)
      expect(container.firstChild).toHaveClass('h-10')
    })

    test('should render size extra large', () => {
      const { container } = render(<Avatar size="xl" />)
      expect(container.firstChild).toHaveClass('h-20')
    })
  })
})
