import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import EventPage from './page'

const Event = () => {
  const { eventId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<EventPage talkId={eventId} />} />
    </Routes>
  )
}

export default memo(Event)
