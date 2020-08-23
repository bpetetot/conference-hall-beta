import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import EventPage from 'features/event'
import EventEdit from './edit'

const Event = () => {
  const { eventId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<EventPage eventId={eventId} />} />
      <Route path="/edit/*" element={<EventEdit eventId={eventId} />} />
    </Routes>
  )
}

export default memo(Event)
