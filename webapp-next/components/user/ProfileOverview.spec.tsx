import { fireEvent, render, screen } from '@testing-library/react'

import { useAuth } from '../../lib/auth'
import ProfileOverview from './ProfileOverview'

describe('ProfileOverview component', () => {
  const mockSignout = jest.fn()

  test('should render the profile overview', () => {
    const user = { name: 'name', email: 'email', photoURL: 'photoURL' }
    mockUseAuth.mockReturnValue({ user })

    render(<ProfileOverview />)

    expect(screen.getByAltText('name avatar')).toBeVisible()
    expect(screen.getByText('name')).toBeVisible()
    expect(screen.getByText('email')).toBeVisible()
  })

  test('should render the profile overview', () => {
    mockUseAuth.mockReturnValue({ signout: mockSignout })

    render(<ProfileOverview />)
    fireEvent.click(screen.getByText('Signout'))

    expect(mockSignout).toHaveBeenCalled()
  })
})

// Mocks
const mockUseAuth = useAuth as jest.Mock
jest.mock('../../lib/auth', () => ({
  useAuth: jest.fn(),
}))
