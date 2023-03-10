import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import EventPage from 'features/event/page'
import Contributors from 'features/contributors'
import AppLayout from '../layout'

function PublicEvent() {
  const { eventId } = useParams()
  return <EventPage eventId={eventId} loadSettings={false} />
}

function Public() {
  return (
    <AppLayout>
      <Routes>
        <Route path="event/:eventId" element={<PublicEvent />} />
        <Route path="contributors" element={<Contributors />} />
      </Routes>
    </AppLayout>
  )
}

export default Public
