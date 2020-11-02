import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import Profile from 'features/auth/profile'
import Contributors from 'features/contributors'
import Talks from 'features/talk/list'
import Talk from './talk'
import Event from './event'
import Sidebar from './sidebar'
import AppLayout from '../layout'

const Speaker = () => {
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" element={<Talks />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contributors" element={<Contributors />} />
        <Route path="talk/*" element={<Talk />} />
        <Route path="event/:eventId/*" element={<Event />} />
      </Routes>
    </AppLayout>
  )
}

export default memo(Speaker)
