import React, { memo } from 'react'

import AppLayout from 'layout'

import Sidebar from 'screens/organizer/sidebar'

const Organizer = () => {
  return <AppLayout sidebar={<Sidebar />}>Hello</AppLayout>
}

export default memo(Organizer)
