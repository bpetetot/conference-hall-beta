import React from 'react'
import { compose } from 'redux'
import forRoute from 'hoc-little-router'

import { protect } from 'store/reducers/auth'
import { Brand, Navbar } from 'screens/components'
import Contributors from 'screens/components/contributors'
import { Sidebar, SidebarMobile } from './sidebar'

import EventCreate from './event/create'
import EventEdit from './event/edit'
import Event from './event/page'
import MyEvents from './events'
import OrganizationCreate from './organization/create'
import OrganizationEdit from './organization/edit'
import OrganizationPage from './organization/page'
import MyOrganizations from './organizations'
import InviteOrganizer from './inviteOrganizer'
import Proposals from './proposals'
import Proposal from './proposal'

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
      <OrganizationCreate />
      <OrganizationEdit />
      <OrganizationPage />
      <MyOrganizations />
      <InviteOrganizer />
      <Proposals />
      <Proposal />
      <Contributors />
    </div>
  </div>
)

export default compose(forRoute('HOME_ORGANIZER'), protect)(Organizer)
