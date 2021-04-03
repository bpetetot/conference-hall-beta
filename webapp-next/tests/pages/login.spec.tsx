import { fireEvent, render, screen } from '@testing-library/react'

import { useAuth } from '../../lib/auth'
import Login from '../../pages/login'

describe('Login page', () => {
  test('should render loading when user is authenticating', () => {
    mockUseAuth.mockReturnValue({ isLoading: true })

    render(<Login />)

    expect(screen.getByAltText('Loading...')).toBeVisible()
  })

  test('should render error when an error occured during signin', () => {
    mockUseAuth.mockReturnValue({ error: 'error', signin: jest.fn() })

    render(<Login />)

    expect(screen.getByText('error')).toBeVisible()
  })

  test('should trigger google signin when user click on it', () => {
    const mockSignin = jest.fn()
    mockUseAuth.mockReturnValue({ signin: mockSignin })

    render(<Login />)
    fireEvent.click(screen.getByText('Sign in with Google'))

    expect(mockSignin).toBeCalledWith('google')
  })

  test('should trigger twitter signin when user click on it', () => {
    const mockSignin = jest.fn()
    mockUseAuth.mockReturnValue({ signin: mockSignin })

    render(<Login />)
    fireEvent.click(screen.getByText('Sign in with Twitter'))

    expect(mockSignin).toBeCalledWith('twitter')
  })

  test('should trigger github signin when user click on it', () => {
    const mockSignin = jest.fn()
    mockUseAuth.mockReturnValue({ signin: mockSignin })

    render(<Login />)
    fireEvent.click(screen.getByText('Sign in with GitHub'))

    expect(mockSignin).toBeCalledWith('github')
  })
})

// Mocks
const mockUseAuth = useAuth as jest.Mock
jest.mock('../../lib/auth', () => ({
  useAuth: jest.fn(),
}))
