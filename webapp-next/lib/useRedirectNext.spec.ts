import { renderHook } from '@testing-library/react-hooks'
import { useRouter } from 'next/router'

import { useRedirectNext } from './useRedirectNext'

describe('#useRedirectNext', () => {
  test('should not redirect if "next" is not in query params', () => {
    const mockReplace = jest.fn()
    mockRouter.mockReturnValue({ query: {}, replace: mockReplace })
    const { result } = renderHook(() => useRedirectNext())

    result.current()

    expect(mockReplace).not.toBeCalled()
  })

  test('should redirect to default route if "next" is not in query params and default defined', () => {
    const mockReplace = jest.fn()
    mockRouter.mockReturnValue({ query: {}, replace: mockReplace })
    const { result } = renderHook(() => useRedirectNext('/'))

    result.current()

    expect(mockReplace).toBeCalledWith('/')
  })

  test('should redirect to the next path if "next" is in query params', () => {
    const mockReplace = jest.fn()
    mockRouter.mockReturnValue({ query: { next: '/next-page' }, replace: mockReplace })
    const { result } = renderHook(() => useRedirectNext())

    result.current()

    expect(mockReplace).toBeCalledWith('/next-page')
  })
})

// Mocks
const mockRouter = useRouter as jest.Mock
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
