import React from 'react'
import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'

import { protect } from 'store/reducers/auth'
import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'
import Profile from 'screens/components/profile'
import Sidebar from './sidebar'
import isEventAuthorized from './isEventAutorized'

import { restrictBeta } from '../conference/betaAccess'
import EventCreate from './event/create'
import EventEdit from './event/edit'
import Event from './event/page'
import MyEvents from './events'
import OrganizationPage from './organization/page'
import OrganizationCreate from './organization/form/organizationCreate.container'
import OrganizationEdit from './organization/form/organizationEdit.container'
import OrganizationsList from './organization/list'
import OrganizationInvite from './organization/invite'
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
    <OrganizationsList />
    <OrganizationInvite />
    <Proposals />
    <Proposal />
    <Contributors />
  </AppLayout>
)

export default compose(
  forRoute('organizer'),
  protect,
  restrictBeta,
  isEventAuthorized,
)(Organizer)
