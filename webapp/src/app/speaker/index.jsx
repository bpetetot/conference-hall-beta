import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import CurrentEventProvider from 'features/event/currentEventContext'
import Profile from 'features/auth/profile'
import Contributors from 'features/contributors'
import Talks from 'features/talk/list'
import TalkCreate from 'features/talk/form/talkCreate'
import Talk from './talk'
import Event from './event'
import Sidebar from './sidebar'
import AppLayout from '../layout'

const Speaker = () => (
  <CurrentEventProvider>
    <AppLayout sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" element={<Talks />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contributors" element={<Contributors />} />
        <Route path="talk/create" element={<TalkCreate />} />
        <Route path="talk/:talkId/*" element={<Talk />} />
        <Route path="event/:eventId/*" element={<Event />} />
      </Routes>
    </AppLayout>
  </CurrentEventProvider>
)

export default memo(Speaker)
