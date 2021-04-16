import { render, screen } from '@testing-library/react'

import TextArea from './TextArea'

describe('TextArea component', () => {
  test('should render the component label', () => {
    render(<TextArea name="name" label="label" />)
    expect(screen.getByLabelText('label')).toBeVisible()
  })

  test('should render the textarea component props', () => {
    render(<TextArea name="name" label="label" defaultValue="value" />)
    expect(screen.getByDisplayValue('value')).toBeVisible()
  })

  test('should display a description', () => {
    render(<TextArea name="name" label="label" description="description" />)
    expect(screen.getByText('description')).toBeVisible()
  })

  test('should display an error', () => {
    render(<TextArea name="name" label="label" error="error" />)
    expect(screen.getByText('error')).toBeVisible()
  })

  test('should display optional in label', () => {
    render(<TextArea name="name" label="label" optional />)
    expect(screen.getByLabelText('label (optional)')).toBeVisible()
  })
})
