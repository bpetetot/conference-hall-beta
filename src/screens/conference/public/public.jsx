import React from 'react'
import forRoute from 'hoc-little-router'

import Brand from 'screens/components/brand'
import Navbar from 'screens/components/navbar'
import Contributors from 'screens/components/contributors'

import Event from './event'

const Public = () => (
  <div className="layout-screen layout-screen-public">
    <Brand className="layout-brand" />
    <Navbar className="layout-navbar" />
    <div className="layout-main layout-main-public">
      <Event />
      <Contributors />
    </div>
  </div>
)

export default forRoute('PUBLIC')(Public)
