import { render, screen } from '@testing-library/react'

import { User } from '../../api/user'
import { useAuth } from '../../lib/auth'
import Profile from '../../pages/profile'

describe('Profile page', () => {
  beforeEach(() => {
    const user: User = { id: 1, uid: 'uid1', name: 'Bobby', photoURL: 'avatar' }
    mockUseAuth.mockReturnValue({ user, isLoading: false, isAuthenticated: true })
  })

  test('should have loading if not authenticated', () => {
    mockUseAuth.mockReturnValue({ isLoading: true, isAuthenticated: false })
    render(<Profile />)
    expect(screen.getByAltText('Loading...')).toBeVisible()
  })

  test('should render profile overview information', () => {
    render(<Profile />)
    expect(screen.getByText('Bobby')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Profile Overview' })).toBeVisible()
  })

  test('should render personal information menu and form', () => {
    render(<Profile />)
    expect(screen.getByRole('link', { name: 'Personal information' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Personal information' })).toBeVisible()
  })

  test('should render speaker details menu and form', () => {
    render(<Profile />)
    expect(screen.getByRole('link', { name: 'Speaker details' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Speaker details' })).toBeVisible()
  })

  test('should render additional information menu and form', () => {
    render(<Profile />)
    expect(screen.getByRole('link', { name: 'Additional information' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Additional information' })).toBeVisible()
  })
})

// Mocks
const mockUseAuth = useAuth as jest.Mock
jest.mock('../../lib/auth', () => ({
  useAuth: jest.fn(),
}))
jest.mock('next/router', () => ({
  useRouter: () => ({ asPath: '/profile' }),
}))
jest.mock('../../api/user', () => ({
  useUpdateUser: () => ({ mutateAsync: jest.fn() }),
}))
