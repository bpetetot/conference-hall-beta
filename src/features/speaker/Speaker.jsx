import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAuth } from 'features/auth'
import AppLayout from 'layout'
import Profile from 'features/profile/profile'
import Sidebar from './sidebar'
import Talks from './talks'
import Talk from './talk'
import TalkCreate from './talk/form/talkCreate'
import Event from './event'

const Speaker = () => {
  const { user } = useAuth()
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" element={<Talks userId={user.uid} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="talk/create" element={<TalkCreate />} />
        <Route path="talk/:talkId/*" element={<Talk />} />
        <Route path="event/:eventId/*" element={<Event />} />
      </Routes>
    </AppLayout>
  )
}

export default memo(Speaker)
