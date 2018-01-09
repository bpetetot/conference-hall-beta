import React from 'react'
import { compose } from 'redux'
import forRoute from 'hoc-little-router'

import { protect } from 'redux/auth'
import { Brand, Navbar } from 'screens/components'
import { Sidebar, SidebarMobile } from './sidebar'
import Profile from './profile'
import MyTalks from './talks/myTalks'
import TalksSubmission from './talks/talksSubmission'
import TalkCreate from './talk/create'
import TalkEdit from './talk/edit'
import TalkSubmit from './talk/submit'
import Talk from './talk/page'
import Event from './event/page'

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
      <TalkSubmit />
      <Talk />
      <MyTalks />
      <TalksSubmission />
      <Event />
    </div>
  </div>
)

export default compose(forRoute('HOME_SPEAKER'), protect)(Speaker)
