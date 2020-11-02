import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAuth } from 'features/auth'
import Profile from 'features/auth/profile'
import Contributors from 'features/contributors'
import Organizations from 'features/organization/list'
import EventsList from 'features/event/list'
import EventCreate from 'features/event/create'
import Sidebar from './sidebar'
import Event from './event'
import Organization from './organization'
import AppLayout from '../layout'

const Organizer = () => {
  const { user } = useAuth()
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" element={<EventsList userId={user.uid} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contributors" element={<Contributors />} />
        <Route path="event/create" element={<EventCreate />} />
        <Route path="event/:eventId/*" element={<Event />} />
        <Route path="organizations" element={<Organizations userId={user.uid} />} />
        <Route path="organization/*" element={<Organization />} />
      </Routes>
    </AppLayout>
  )
}

export default memo(Organizer)
