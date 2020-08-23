import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import AppLayout from 'layout'
import Profile from 'features/profile'
import Contributors from 'features/contributors'
import Sidebar from './sidebar'

const Organizer = () => {
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="contributors" element={<Contributors />} />
      </Routes>
    </AppLayout>
  )
}

export default memo(Organizer)
