import { render, screen } from '@testing-library/react'

import { useAuth } from '../../lib/auth'
import ProfileOverview from './ProfileOverview'

describe('ProfileOverview component', () => {
  test('should render the profile overview', () => {
    const user = { name: 'name', email: 'email', photoURL: 'photoURL' }
    mockUseAuth.mockReturnValue({ user })

    render(<ProfileOverview />)

    expect(screen.getByAltText('name avatar')).toBeVisible()
    expect(screen.getByText('name')).toBeVisible()
    expect(screen.getByText('email')).toBeVisible()
  })
})

// Mocks
const mockUseAuth = useAuth as jest.Mock
jest.mock('../../lib/auth', () => ({
  useAuth: jest.fn(),
}))
