import React from 'react'
import { compose } from 'redux'
import forRoute from 'hoc-little-router'

import { protect } from 'redux/auth'
import { Brand, Navbar } from 'screens/components'
import { Sidebar, SidebarMobile } from './sidebar'

import EventCreate from './event/create'
import EventEdit from './event/edit'
import Event from './event/read'
import MyEvents from './event/myEvents'

const Organizer = () => (
  <div className="layout-screen">
    <Brand className="layout-brand" />
    <Navbar className="layout-navbar" />
    <Sidebar className="layout-sidebar" />
    <div className="layout-main">
      <SidebarMobile />
      <EventCreate />
      <EventEdit />
      <Event />
      <MyEvents />
    </div>
  </div>
)

export default compose(forRoute('HOME_ORGANIZER'), protect)(Organizer)
