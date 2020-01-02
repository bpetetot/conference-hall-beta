/* eslint-env jest */
import { act } from 'react-test-renderer'
import { renderHook } from '@testing-library/react-hooks'

import {
  queryOrganizersThread,
  addOrganizersThreadMessage,
  updateOrganizersThreadMessage,
  deleteOrganizersThreadMessage,
} from 'firebase/proposals'
import { toDate } from 'helpers/firebase'

import useOrganizerThreads from './useOrganizerThreads'

describe('useOrganizerThreads', () => {
  beforeEach(() => {
    queryOrganizersThread.mockReset()
    addOrganizersThreadMessage.mockReset()
    updateOrganizersThreadMessage.mockReset()
    deleteOrganizersThreadMessage.mockReset()
    toDate.mockReset()
  })

  it('should return default values of the hook', async () => {
    queryOrganizersThread.mockReturnValue({
      onSnapshot: callback => {
        callback({ docs: [] })
        return () => jest.fn()
      },
    })

    const { result } = renderHook(() =>
      useOrganizerThreads({ eventId: 'eventId', proposalId: 'proposalId', user: {} }),
    )

    expect(result.current.messages).toEqual([])
  })

  it('should return messages', async () => {
    toDate.mockReturnValue('date')
    queryOrganizersThread.mockReturnValue({
      onSnapshot: callback => {
        callback({
          docs: [
            {
              id: 'message1',
              data: () => ({
                uid: 'luke',
                displayName: 'Luke Skywalker',
                photoURL: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
                message: 'May the force be with you',
              }),
            },
          ],
        })
        return () => jest.fn()
      },
    })

    const { result } = renderHook(() =>
      useOrganizerThreads({ eventId: 'eventId', proposalId: 'proposalId', user: { uid: 'alice' } }),
    )

    expect(result.current.messages).toEqual([
      {
        id: 'message1',
        owner: 'luke',
        date: 'date',
        displayName: 'Luke Skywalker',
        message: 'May the force be with you',
        modified: undefined,
        photoURL: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
    ])
  })

  it('should add a message', async () => {
    queryOrganizersThread.mockReturnValue({
      onSnapshot: callback => {
        callback({ docs: [] })
        return () => jest.fn()
      },
    })

    const { result } = renderHook(() =>
      useOrganizerThreads({ eventId: 'eventId', proposalId: 'proposalId', user: {} }),
    )

    await act(async () => {
      await result.current.saveMessage('hello')
    })

    expect(addOrganizersThreadMessage.mock.calls[0]).toEqual(['eventId', 'proposalId', 'hello', {}])
  })

  it('should update a message', async () => {
    queryOrganizersThread.mockReturnValue({
      onSnapshot: callback => {
        callback({ docs: [] })
        return () => jest.fn()
      },
    })

    const { result } = renderHook(() =>
      useOrganizerThreads({ eventId: 'eventId', proposalId: 'proposalId', user: {} }),
    )

    await act(async () => {
      await result.current.saveMessage('hello', 'message1')
    })

    expect(updateOrganizersThreadMessage.mock.calls[0]).toEqual([
      'eventId',
      'proposalId',
      'message1',
      'hello',
    ])
  })

  it('should delete a message', async () => {
    queryOrganizersThread.mockReturnValue({
      onSnapshot: callback => {
        callback({ docs: [] })
        return () => jest.fn()
      },
    })

    const { result } = renderHook(() =>
      useOrganizerThreads({ eventId: 'eventId', proposalId: 'proposalId', user: {} }),
    )

    await act(async () => {
      await result.current.deleteMessage('message1')
    })

    expect(deleteOrganizersThreadMessage.mock.calls[0]).toEqual([
      'eventId',
      'proposalId',
      'message1',
    ])
  })
})

jest.mock('firebase/proposals', () => ({
  __esModule: true,
  queryOrganizersThread: jest.fn(),
  addOrganizersThreadMessage: jest.fn(),
  updateOrganizersThreadMessage: jest.fn(),
  deleteOrganizersThreadMessage: jest.fn(),
}))

jest.mock('helpers/firebase', () => ({
  __esModule: true,
  toDate: jest.fn(),
}))
