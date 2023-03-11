/* eslint-env jest */
import { act } from 'react-test-renderer'
import { renderHook } from '@testing-library/react-hooks'

import invites, { fetchInviteByType } from '../../../../firebase/invites'

import useInviteLink from './useInviteLink'

describe('useInviteLink', () => {
  beforeEach(() => {
    fetchInviteByType.mockReset()
    invites.create.mockReset()
    invites.delete.mockReset()
  })

  it('should return nothing if no invites', async () => {
    fetchInviteByType.mockReturnValue(Promise.resolve())

    const { result, waitForNextUpdate } = renderHook(() =>
      useInviteLink({
        entity: 'talk',
        entityId: 'talk1',
        entityTitle: 'My talk',
        uid: 'alice',
      }),
    )

    await waitForNextUpdate()

    expect(result.current.loading).toEqual(false)
    expect(result.current.inviteLink).toEqual(null)
  })

  it('should return an invite link if exists', async () => {
    fetchInviteByType.mockReturnValue(Promise.resolve({ docs: [{ id: 'invite1' }] }))

    const { result, waitForNextUpdate } = renderHook(() =>
      useInviteLink({
        entity: 'talk',
        entityId: 'talk1',
        entityTitle: 'My talk',
        uid: 'alice',
      }),
    )

    await waitForNextUpdate()

    expect(result.current.loading).toEqual(false)
    expect(result.current.inviteLink).toEqual('http://localhost/invite/invite1')
  })

  it('should generate an invite link', async () => {
    fetchInviteByType.mockReturnValue(Promise.resolve())
    invites.create.mockReturnValue(Promise.resolve({ id: 'invite1' }))

    const { result, waitForNextUpdate } = renderHook(() =>
      useInviteLink({
        entity: 'talk',
        entityId: 'talk1',
        entityTitle: 'My talk',
        uid: 'alice',
      }),
    )

    await waitForNextUpdate()

    await act(async () => {
      await result.current.generate()
    })

    expect(invites.create.mock.calls[0][0]).toEqual({
      entity: 'talk',
      entityId: 'talk1',
      entityTitle: 'My talk',
      creator: 'alice',
    })
    expect(result.current.loading).toEqual(false)
    expect(result.current.inviteLink).toEqual('http://localhost/invite/invite1')
  })

  it('should revoke an invite link', async () => {
    fetchInviteByType.mockReturnValue(Promise.resolve({ docs: [{ id: 'invite1' }] }))

    const { result, waitForNextUpdate } = renderHook(() =>
      useInviteLink({
        entity: 'talk',
        entityId: 'talk1',
        entityTitle: 'My talk',
        uid: 'alice',
      }),
    )

    await waitForNextUpdate()

    expect(result.current.loading).toEqual(false)
    expect(result.current.inviteLink).toEqual('http://localhost/invite/invite1')

    await act(async () => {
      await result.current.revoke()
    })

    expect(invites.delete.mock.calls[0][0]).toEqual('invite1')
    expect(result.current.loading).toEqual(false)
    expect(result.current.inviteLink).toEqual(null)
  })
})

jest.mock('../../../../firebase/invites', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    delete: jest.fn(),
  },
  fetchInviteByType: jest.fn(),
}))
