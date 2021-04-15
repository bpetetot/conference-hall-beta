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
    const { container } = render(
      <FormCard title="X" method="POST">
        Content
      </FormCard>,
    )
    expect(container.firstChild).toHaveAttribute('method')
  })

  test('should render a form with content and actions', () => {
    render(
      <FormCard title="X">
        <FormCard.Content>Content</FormCard.Content>
        <FormCard.Actions>Actions</FormCard.Actions>
      </FormCard>,
    )
    expect(screen.getByText('Content')).toBeVisible()
    expect(screen.getByText('Actions')).toBeVisible()
  })

  test('should display submitting status', () => {
    render(
      <FormCard title="X" isSubmitting={true} submittingMessage="Submitting">
        <FormCard.Content>Content</FormCard.Content>
      </FormCard>,
    )
    expect(screen.getByText('Submitting')).toBeVisible()
  })

  test('should display successful submit message', () => {
    render(
      <FormCard title="X" isSubmitSuccess={true} submitSuccessMessage="Success">
        <FormCard.Content>Content</FormCard.Content>
      </FormCard>,
    )
    expect(screen.getByText('Success')).toBeVisible()
  })

  test('should display failed submit message', () => {
    render(
      <FormCard title="X" isSubmitFail={true} submitFailMessage="Fail">
        <FormCard.Content>Content</FormCard.Content>
      </FormCard>,
    )
    expect(screen.getByText('Fail')).toBeVisible()
  })
})
