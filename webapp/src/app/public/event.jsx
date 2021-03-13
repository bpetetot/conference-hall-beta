import React from 'react'
import { useParams } from 'react-router-dom'

import EventPage from 'features/event/page'
import { useEvent } from 'data/event'
import LoadingIndicator from 'components/loader'

const Event = () => {
  const { eventId } = useParams()
  const { data: event, isLoading, isError, error } = useEvent(eventId)

  if (isLoading) return <LoadingIndicator />

  if (isError) return <div>An unexpected error has occurred: {error.message}</div>

  return <EventPage event={event} />
}

export default Event
