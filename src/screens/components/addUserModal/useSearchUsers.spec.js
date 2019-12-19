/* eslint-env jest */
import { act } from 'react-test-renderer'
import { renderHook } from '@testing-library/react-hooks'

import { fetchUsersByEmail } from 'firebase/user'

import useSearchUsers from './useSearchUsers'

describe('useSearchUsers', () => {
  beforeEach(() => {
    fetchUsersByEmail.mockReset()
  })

  it('should return default values of the hook', async () => {
    fetchUsersByEmail.mockReturnValue(Promise.resolve())

    const { result } = renderHook(() => useSearchUsers())

    expect(result.current.users).toEqual(null)
    expect(result.current.email).toEqual(null)
    expect(result.current.loading).toEqual(false)
  })

  it('should return nothing if no invites', async () => {
    fetchUsersByEmail.mockReturnValue(Promise.resolve(['user']))

    const { result } = renderHook(() => useSearchUsers())

    await act(async () => {
      await result.current.searchUsers('test@test.com')
    })

    expect(fetchUsersByEmail.mock.calls[0][0]).toEqual('test@test.com')
    expect(result.current.users).toEqual(['user'])
    expect(result.current.email).toEqual('test@test.com')
    expect(result.current.loading).toEqual(false)
  })
})

jest.mock('firebase/user', () => ({
  __esModule: true,
  fetchUsersByEmail: jest.fn(),
}))
