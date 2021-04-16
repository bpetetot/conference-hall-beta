import { render, screen } from '@testing-library/react'

import Input from './Input'

describe('Input component', () => {
  test('should render the component label', () => {
    render(<Input name="name" label="label" />)
    expect(screen.getByLabelText('label')).toBeVisible()
  })

  test('should render the input component props', () => {
    render(<Input name="name" label="label" defaultValue="value" />)
    expect(screen.getByDisplayValue('value')).toBeVisible()
  })

  test('should display a description', () => {
    render(<Input name="name" label="label" description="description" />)
    expect(screen.getByText('description')).toBeVisible()
  })

  test('should display an error', () => {
    render(<Input name="name" label="label" error="error" />)
    expect(screen.getByText('error')).toBeVisible()
  })

  test('should display optional in label', () => {
    render(<Input name="name" label="label" optional />)
    expect(screen.getByLabelText('label (optional)')).toBeVisible()
  })
})
