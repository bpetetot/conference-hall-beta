import { useQuery } from 'react-query'

import { fetchData, HttpError } from './fetch'

type Event = {
  id: number
  name: string
  description: string
  bannerUrl?: string
}

async function fetchEvent(eventId: string) {
  const event = await fetchData({ url: `/api/events/${eventId}` })
  return event as Event
}

export function useEvent(eventId: string) {
  return useQuery<Event, HttpError, Event>(['events', eventId], () => fetchEvent(eventId), {
    enabled: !!eventId,
  })
}
