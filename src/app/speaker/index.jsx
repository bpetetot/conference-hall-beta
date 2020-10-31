import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAuth } from 'features/auth'
import Profile from 'features/profile'
import Contributors from 'features/contributors'
import Talks from 'features/talk/list'
import TalkCreate from 'features/talk/form'
import Talk from './talk'
import Event from './event'
import Sidebar from './sidebar'
import AppLayout from '../layout'

const Speaker = () => {
  const { user } = useAuth()
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" element={<Talks userId={user.uid} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contributors" element={<Contributors />} />
        <Route path="talk/create" element={<TalkCreate />} />
        <Route path="talk/:talkId/*" element={<Talk />} />
        <Route path="event/:eventId/*" element={<Event />} />
      </Routes>
    </AppLayout>
  )
}

export default memo(Speaker)
