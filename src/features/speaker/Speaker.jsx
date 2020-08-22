import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAuth } from 'features/auth'
import AppLayout from 'layout'
import Profile from 'features/profile/profile'
import Sidebar from './sidebar'
import Talks from './talks'

const Speaker = () => {
  const { user } = useAuth()
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" element={<Talks userId={user.uid} />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </AppLayout>
  )
}

export default memo(Speaker)
