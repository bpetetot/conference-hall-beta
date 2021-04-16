import { fireEvent, render, screen } from '@testing-library/react'

import { Button, ButtonLink } from './Button'

describe('Button component', () => {
  const mockClick = jest.fn()

  test('should render the default Button', () => {
    render(<Button onClick={mockClick}>Name</Button>)
    expect(screen.getByText('Name')).toBeVisible()
  })

  test('should execute onClick when user click on button', () => {
    render(<Button onClick={mockClick}>Name</Button>)
    fireEvent.click(screen.getByText('Name'))
    expect(mockClick).toBeCalled()
  })

  test('should render block Button', () => {
    const { container } = render(
      <Button onClick={mockClick} block>
        Name
      </Button>,
    )
    expect(container.firstChild).toHaveClass('w-full')
  })

  test('should render primary Button', () => {
    const { container } = render(
      <Button onClick={mockClick} primary>
        Name
      </Button>,
    )
    expect(container.firstChild).toHaveClass('bg-primary-600')
  })

  test('should render secondary Button', () => {
    const { container } = render(
      <Button onClick={mockClick} secondary>
        Name
      </Button>,
    )
    expect(container.firstChild).toHaveClass('bg-white')
  })
})

describe('ButtonLink component', () => {
  test('should render the default ButtonLink', () => {
    render(<ButtonLink href="/">Name</ButtonLink>)
    expect(screen.getByText('Name')).toBeVisible()
  })
})
