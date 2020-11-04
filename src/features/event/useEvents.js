/* eslint-disable import/prefer-default-export */
import { useMutation, useQuery, useQueryCache } from 'react-query'
import eventCrud from 'firebase/events'
import { useAuth } from 'features/auth'

export const useEvent = (eventId) => {
  return useQuery(['event', eventId], async () => {
    if (!eventId) return null
    const result = await eventCrud.read(eventId)
    return result.data()
  })
}

export const useSaveEvent = (eventId) => {
  const { user } = useAuth()
  const cache = useQueryCache()
  return useMutation(async (data) => {
    if (eventId) {
      await eventCrud.update({ id: eventId, ...data })
      return cache.invalidateQueries(['event', eventId])
    }
    return eventCrud.create({ ...data, owner: user.uid })
  })
}
