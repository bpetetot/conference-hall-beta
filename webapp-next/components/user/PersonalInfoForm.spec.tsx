import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useUpdateUser } from '../../api/user'
import { useAuth } from '../../lib/auth'
import PersonalInfoForm from './PersonalInfoForm'

describe('PersonalInfoForm component', () => {
  const mockUpdate = jest.fn()

  beforeEach(() => {
    mockAuth.mockReturnValue({
      user: { name: 'user name', email: 'user@example.net', photoURL: 'https://example.net' },
    })
    mockUpdateUser.mockReturnValue({
      mutateAsync: mockUpdate,
    })
  })

  test('should fill default user values', () => {
    render(<PersonalInfoForm />)
    expect(screen.getByDisplayValue('user name')).toBeVisible()
    expect(screen.getByDisplayValue('user@example.net')).toBeVisible()
    expect(screen.getByDisplayValue('https://example.net')).toBeVisible()
  })

  test('display error for required fields', async () => {
    mockAuth.mockReturnValue({ user: {} })
    render(<PersonalInfoForm />)

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(screen.queryAllByRole('alert')[0]).toHaveTextContent('A full name is required')
      expect(screen.queryAllByRole('alert')[1]).toHaveTextContent('An email address is required')
      expect(mockUpdate).not.toHaveBeenCalled()
    })
  })

  test('display error for invalid email', async () => {
    render(<PersonalInfoForm />)

    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test' },
    })
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(screen.queryAllByRole('alert')[0]).toHaveTextContent('Invalid email')
      expect(mockUpdate).not.toHaveBeenCalled()
    })
  })

  test('display error for invalid photo URL', async () => {
    render(<PersonalInfoForm />)

    fireEvent.input(screen.getByRole('textbox', { name: /photo/i }), {
      target: { value: 'test' },
    })
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(screen.queryAllByRole('alert')[0]).toHaveTextContent('Invalid URL')
      expect(mockUpdate).not.toHaveBeenCalled()
    })
  })

  test('display error when an unhandled server error occured', async () => {
    mockUpdate.mockRejectedValue({})
    render(<PersonalInfoForm />)

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled()
      expect(screen.getByText('An error occured')).toBeVisible()
    })
  })

  test('submit the form when no submission errors', async () => {
    mockUpdate.mockResolvedValue({})
    render(<PersonalInfoForm />)

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(screen.queryAllByRole('alert')).toHaveLength(0)
      expect(mockUpdate).toHaveBeenCalledWith({
        name: 'user name',
        email: 'user@example.net',
        photoURL: 'https://example.net',
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
