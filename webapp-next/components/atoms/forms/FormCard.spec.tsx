import { render, screen } from '@testing-library/react'

import FormCard from './FormCard'

describe('FormCard component', () => {
  test('should render the component with title and description', () => {
    render(
      <FormCard title="title" description="description">
        Children
      </FormCard>,
    )
    expect(screen.getByText('title')).toBeVisible()
    expect(screen.getByText('description')).toBeVisible()
    expect(screen.getByText('Children')).toBeVisible()
  })

  test('should render the component with form props', () => {
    const { container } = render(<FormCard method="POST">Content</FormCard>)
    expect(container.firstChild).toHaveAttribute('method')
  })

  test('should render a form with content and actions', () => {
    render(
      <FormCard>
        <FormCard.Content>Content</FormCard.Content>
        <FormCard.Actions>Actions</FormCard.Actions>
      </FormCard>,
    )
    expect(screen.getByText('Content')).toBeVisible()
    expect(screen.getByText('Actions')).toBeVisible()
  })
})
