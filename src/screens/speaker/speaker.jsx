import React from 'react'
import { compose } from 'redux'
import forRoute from 'hoc-little-router'

import { protect } from 'redux/auth'
import { Brand, Navbar } from 'screens/components'
import { Sidebar, SidebarMobile } from './sidebar'
import Profile from './profile'
import MyTalks from './myTalks'
import TalkCreate from './talk/create'
import TalkEdit from './talk/edit'
import TalksSelection from './submission/talksSelection'
import TalkSubmission from './submission/talkSubmission'
import TalkSubmitted from './submission/talkSubmitted'
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
      <Talk />
      <MyTalks />
      <TalksSelection />
      <TalkSubmission />
      <TalkSubmitted />
      <Event />
    </div>
  </div>
)

export default compose(forRoute('HOME_SPEAKER'), protect)(Speaker)
