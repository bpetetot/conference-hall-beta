import React from 'react'
import { compose } from 'redux'
import forRoute from 'hoc-little-router'

import { protect } from 'store/reducers/auth'
import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'
import { Sidebar, SidebarMobile } from './sidebar'

import { restrictBeta } from '../conference/betaAccess'
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
  <AppLayout sidebar={<Sidebar />}>
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
  </AppLayout>
)

export default compose(forRoute('HOME_ORGANIZER'), protect, restrictBeta)(Organizer)
