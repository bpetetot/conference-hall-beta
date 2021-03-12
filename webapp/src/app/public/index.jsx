import React from 'react'
import { Route, Routes } from 'react-router-dom'

import EventPage from 'features/event/page'
import Contributors from 'features/contributors'
import AppLayout from '../layout'

const Public = () => (
  <AppLayout>
    <Routes>
      <Route path="event/:eventId" element={<EventPage />} />
      <Route path="contributors" element={<Contributors />} />
    </Routes>
  </AppLayout>
)

export default Public
