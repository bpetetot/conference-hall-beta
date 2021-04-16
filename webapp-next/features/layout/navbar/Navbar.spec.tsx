import { fireEvent, render, screen } from '@testing-library/react'

import { useAuth } from '../../../lib/auth'
import Navbar from './Navbar'

describe('Navbar component', () => {
  test('should render the profile overview', () => {
    const user = { name: 'name', email: 'email', photoURL: 'photoURL' }
    mockUseAuth.mockReturnValue({ user })

    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Talks' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Profile' })).toBeVisible()
  })

  test('should open nav mobile on click toggle menu', () => {
    const user = { name: 'name', email: 'email', photoURL: 'photoURL' }
    mockUseAuth.mockReturnValue({ user })

    render(<Navbar />)
    fireEvent.click(screen.getByText('Toggle main menu'))

    expect(screen.getByText('name')).toBeVisible()
    expect(screen.getByText('email')).toBeVisible()
  })
})

// Mocks
const mockUseAuth = useAuth as jest.Mock
jest.mock('../../lib/auth', () => ({
  useAuth: jest.fn(),
}))

jest.mock('next/router', () => ({
  useRouter: () => jest.fn(),
}))
