import React from 'react'
import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'

import { protect } from 'store/reducers/auth'
import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'
import Profile from 'screens/components/profile'
import Sidebar from './sidebar'

import { restrictBeta } from '../conference/betaAccess'
import EventCreate from './event/create'
import EventEdit from './event/edit'
import Event from './event/page'
import MyEvents from './events'
import OrganizationCreate from './organization/create'
import OrganizationEdit from './organization/edit'
import OrganizationPage from './organization/page'
import InviteOrganizer from './organization/invite'
import MyOrganizations from './organizations'
import Proposals from './proposals'
import Proposal from './proposal'

const Organizer = () => (
  <AppLayout sidebar={<Sidebar />}>
    <Profile />
    <EventCreate />
    <EventEdit />
    <Event />
    <MyEvents />
    <OrganizationCreate />
    <OrganizationEdit />
    <OrganizationPage />
    <InviteOrganizer />
    <MyOrganizations />
    <Proposals />
    <Proposal />
    <Contributors />
  </AppLayout>
)

export default compose(forRoute('organizer'), protect, restrictBeta)(Organizer)
