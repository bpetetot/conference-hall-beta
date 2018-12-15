import React from 'react'
import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'

import { protect } from 'store/reducers/auth'
import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'
import Profile from 'screens/components/profile'
import Sidebar from './sidebar'
import MyTalks from './myTalks'
import TalkCreate from './talk/create'
import TalkEdit from './talk/edit'
import TalkSubmission from './talk/submission'
import Talk from './talk/page'
import EventPage from './event/page'
import EventSubmission from './event/submission'
import EventSurvey from './event/survey'
import InviteSpeaker from './inviteSpeaker'

const Speaker = () => (
  <AppLayout sidebar={<Sidebar />}>
    <Profile />
    <TalkCreate />
    <TalkEdit />
    <TalkSubmission />
    <Talk />
    <MyTalks />
    <EventPage />
    <EventSubmission />
    <EventSurvey />
    <InviteSpeaker />
    <Contributors />
  </AppLayout>
)

export default compose(forRoute('HOME_SPEAKER'), protect)(Speaker)
