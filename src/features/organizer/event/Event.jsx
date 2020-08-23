import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import EventPage from 'features/event'

const Event = () => {
  const { eventId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<EventPage eventId={eventId} />} />
    </Routes>
  )
}

export default memo(Event)
