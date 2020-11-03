/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query'
import eventCrud from 'firebase/events'

export const useEvent = (eventId) => {
  return useQuery(['event', eventId], async () => {
    if (!eventId) return null
    const result = await eventCrud.read(eventId)
    return result.data()
  })
}
