import React, { memo } from 'react'
import { useParams } from 'react-router-dom'

import EventPage from 'features/event'

const PublicEvent = () => {
  const { eventId } = useParams()
  return <EventPage eventId={eventId} loadSettings={false} />
}

export default memo(PublicEvent)
