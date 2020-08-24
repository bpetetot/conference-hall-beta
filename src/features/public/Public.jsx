import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AppLayout from 'layout'
import Contributors from 'features/contributors'

import PublicEvent from './PublicEvent'

const Public = () => (
  <AppLayout>
    <Routes>
      <Route path="event/:eventId" element={<PublicEvent />} />
      <Route path="contributors" element={<Contributors />} />
    </Routes>
  </AppLayout>
)

export default Public
