import { renderHook } from '@testing-library/react-hooks'
import { useRouter } from 'next/router'

import { useSelectedRoute } from './useSelectedRoute'

describe('#useSelectedRoute', () => {
  test('should return false if no path from router', () => {
    mockRouter.mockReturnValue({ asPath: null })
    const { result } = renderHook(() => useSelectedRoute('/myroute'))

    expect(result.current).toBe(false)
  })

  test('should return true if route is corresponding to the href', () => {
    mockRouter.mockReturnValue({ route: '/myroute', asPath: '/myroute' })
    const { result } = renderHook(() => useSelectedRoute('/myroute'))

    expect(result.current).toBe(true)
  })

  test('should return false if route is not corresponding to the href', () => {
    mockRouter.mockReturnValue({ route: '/myroute2', asPath: '/myroute2' })
    const { result } = renderHook(() => useSelectedRoute('/myroute'))

    expect(result.current).toBe(false)
  })

  test('should return true if route is not corresponding to a href anchor', () => {
    mockRouter.mockReturnValue({ asPath: '/myroute#anchor' })
    const { result } = renderHook(() => useSelectedRoute('#anchor'))

    expect(result.current).toBe(true)
  })

  test('should return false if route is not corresponding to a href anchor', () => {
    mockRouter.mockReturnValue({ asPath: '/myroute#anchor2' })
    const { result } = renderHook(() => useSelectedRoute('#anchor'))

    expect(result.current).toBe(false)
  })

  test('should return true if route should be default selected when no anchor', () => {
    mockRouter.mockReturnValue({ asPath: '/myroute' })
    const { result } = renderHook(() => useSelectedRoute('#anchor', true))

    expect(result.current).toBe(true)
  })

  test('should return false if route should be default selected but it is an other anchor', () => {
    mockRouter.mockReturnValue({ asPath: '/myroute#anchor2' })
    const { result } = renderHook(() => useSelectedRoute('#anchor', true))

    expect(result.current).toBe(false)
  })
})

// Mocks
const mockRouter = useRouter as jest.Mock
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
