import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useUpdateUser } from '../../api/user'
import { useAuth } from '../../lib/auth'
import AdditionalInfoForm from './AdditionalInfoForm'

describe('AdditionalInfoForm component', () => {
  const mockUpdate = jest.fn()

  beforeEach(() => {
    mockAuth.mockReturnValue({
      user: { company: 'World company', address: 'Address', twitter: 'twitter', github: 'github' },
    })
    mockUpdateUser.mockReturnValue({
      mutateAsync: mockUpdate,
    })
  })

  test('should fill default user values', () => {
    render(<AdditionalInfoForm id="additional" />)
    expect(screen.getByDisplayValue('World company')).toBeVisible()
    expect(screen.getByDisplayValue('Address')).toBeVisible()
    expect(screen.getByDisplayValue('twitter')).toBeVisible()
    expect(screen.getByDisplayValue('github')).toBeVisible()
  })

  test('display error when an unhandled server error occured', async () => {
    mockUpdate.mockRejectedValue({})
    render(<AdditionalInfoForm id="additional" />)

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled()
      expect(screen.getByText('An error occured')).toBeVisible()
    })
  })

  test('submit the form when no submission errors', async () => {
    mockUpdate.mockResolvedValue({})
    render(<AdditionalInfoForm id="additional" />)

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(screen.queryAllByRole('alert')).toHaveLength(0)
      expect(mockUpdate).toHaveBeenCalledWith({
        company: 'World company',
        address: 'Address',
        twitter: 'twitter',
        github: 'github',
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
