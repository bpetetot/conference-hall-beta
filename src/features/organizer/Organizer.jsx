import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import AppLayout from 'layout'
import Profile from 'features/profile/profile'
import Sidebar from './sidebar'

const Organizer = () => {
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Routes>
        <Route path="profile" element={<Profile />} />
      </Routes>
    </AppLayout>
  )
}

export default memo(Organizer)
