import React from 'react'
import { compose } from 'redux'
import forRoute from 'hoc-little-router'

import { protect } from 'store/reducers/auth'
import { Brand, Navbar } from 'screens/components'
import Contributors from 'screens/components/contributors'
import { Sidebar, SidebarMobile } from './sidebar'
import Profile from './profile'
import MyTalks from './myTalks'
import TalkCreate from './talk/create'
import TalkEdit from './talk/edit'
import Talk from './talk/page'
import EventPage from './event/page'
import EventSubmission from './event/submission'
import InviteSpeaker from './inviteSpeaker'

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
      <EventPage />
      <EventSubmission />
      <InviteSpeaker />
      <Contributors />
    </div>
  </div>
)

export default compose(forRoute('HOME_SPEAKER'), protect)(Speaker)
