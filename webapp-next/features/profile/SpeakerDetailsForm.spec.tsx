import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useUpdateUser } from '../../api/user'
import { useAuth } from '../../lib/auth'
import SpeakerDetailsForm from './SpeakerDetailsForm'

describe('SpeakerDetailsForm component', () => {
  const mockUpdate = jest.fn()

  beforeEach(() => {
    mockAuth.mockReturnValue({
      user: { bio: 'Hello world', references: 'My references', language: 'French' },
    })
    mockUpdateUser.mockReturnValue({
      mutateAsync: mockUpdate,
    })
  })

  test('should fill default user values', () => {
    render(<SpeakerDetailsForm id="speaker" />)
    expect(screen.getByDisplayValue('Hello world')).toBeVisible()
    expect(screen.getByDisplayValue('My references')).toBeVisible()
    expect(screen.getByDisplayValue('French')).toBeVisible()
  })

  test('display error when an unhandled server error occured', async () => {
    mockUpdate.mockRejectedValue({})
    render(<SpeakerDetailsForm id="speaker" />)

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled()
      expect(screen.getByText('An error occured')).toBeVisible()
    })
  })

  test('submit the form when no submission errors', async () => {
    mockUpdate.mockResolvedValue({})
    render(<SpeakerDetailsForm id="speaker" />)

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(screen.queryAllByRole('alert')).toHaveLength(0)
      expect(mockUpdate).toHaveBeenCalledWith({
        bio: 'Hello world',
        references: 'My references',
        language: 'French',
      })
      expect(screen.getByText('Successfully saved')).toBeVisible()
    })
  })
})

// Mocks
const mockAuth = useAuth as jest.Mock
jest.mock('../../lib/auth', () => ({
  useAuth: jest.fn(),
}))
const mockUpdateUser = useUpdateUser as jest.Mock
jest.mock('../../api/user', () => ({
  useUpdateUser: jest.fn(),
}))
