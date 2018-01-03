import React from 'react'

import Brand from 'screens/components/brand'
import Navbar from 'screens/components/navbar'
import Event from './event'

const Public = () => (
  <div className="layout-screen layout-screen-public">
    <Brand className="layout-brand" />
    <Navbar className="layout-navbar" />
    <div className="layout-main layout-main-public">
      <Event />
    </div>
  </div>
)

export default Public
