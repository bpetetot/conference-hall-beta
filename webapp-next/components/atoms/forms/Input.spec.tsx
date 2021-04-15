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
})
