import React, { memo } from 'react'

import AppLayout from 'layout'
import Sidebar from 'screens/speaker/sidebar'

const Speaker = () => {
  return <AppLayout sidebar={<Sidebar />}>Hello</AppLayout>
}

export default memo(Speaker)
