import React, { memo } from 'react'
import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'

import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'
import Profile from 'screens/components/profile'
import { useAuth, protect } from 'features/auth'

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
import Proposals from './proposals'
import Proposal from './proposal'

const Organizer = () => {
  const { user } = useAuth()
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Profile />
      <EventCreate userId={user.uid} />
      <EventEdit />
      <Event />
      <MyEvents userId={user.uid} />
      <OrganizationCreate userId={user.uid} />
      <OrganizationEdit />
      <OrganizationPage />
      <OrganizationsList userId={user.uid} />
      <Proposals />
      <Proposal />
      <Contributors />
    </AppLayout>
  )
}

export default compose(
  memo,
  forRoute('organizer'),
  protect,
  restrictBeta,
  isEventAuthorized,
)(Organizer)
