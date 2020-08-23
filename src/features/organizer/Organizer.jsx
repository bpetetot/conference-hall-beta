import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import AppLayout from 'layout'
import { useAuth } from 'features/auth'
import Profile from 'features/profile'
import Contributors from 'features/contributors'
import Events from './events'
import Sidebar from './sidebar'
import EventCreate from './event/create'
import Event from './event'

const Organizer = () => {
  const { user } = useAuth()
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" element={<Events userId={user.uid} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contributors" element={<Contributors />} />
        <Route path="event/create" element={<EventCreate />} />
        <Route path="event/:eventId/*" element={<Event />} />
      </Routes>
    </AppLayout>
  )
}

export default memo(Organizer)
