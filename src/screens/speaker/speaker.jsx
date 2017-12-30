import React from 'react'
import { compose } from 'redux'
import forRoute from 'hoc-little-router'

import { protect } from 'redux/auth'
import { Brand, Navbar } from 'screens/components'
import { Sidebar, SidebarMobile } from './sidebar'
import Profile from './profile'
import TalkCreate from './talk/create'
import TalkEdit from './talk/edit'
import MyTalks from './talk/myTalks'
import Talk from './talk/page'

const Speaker = () => (
  <div className="layout-screen">
    <Brand className="layout-brand" />
    <Navbar className="layout-navbar" />
    <Sidebar className="layout-sidebar" />
    <div className="layout-main">
      <SidebarMobile />
      <Profile />
      <TalkCreate />
      <TalkEdit />
      <Talk />
      <MyTalks />
    </div>
  </div>
)

export default compose(forRoute('HOME_SPEAKER'), protect)(Speaker)
