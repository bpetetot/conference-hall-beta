import React from 'react'
import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'

import { protect } from 'store/reducers/auth'
import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'
import Profile from 'screens/components/profile'
import Sidebar from './sidebar'
import MyTalks from './myTalks'
import { TalkEdit, TalkCreate } from './talk/form'
import TalkSubmission from './talk/submission'
import Talk from './talk/page'
import InviteSpeaker from './talk/invite'
import EventPage from './event/page'
import EventSubmitForm from './event/submission'
import EventSubmissions from './event/submissions'
import EventSubmissionPage from './event/submissions/page'
import EventSurvey from './event/survey'

const Speaker = () => (
  <AppLayout sidebar={<Sidebar />}>
    <Profile />
    <TalkCreate />
    <TalkEdit />
    <TalkSubmission />
    <Talk />
    <InviteSpeaker />
    <MyTalks />
    <EventPage />
    <EventSubmitForm />
    <EventSubmissions />
    <EventSubmissionPage />
    <EventSurvey />
    <Contributors />
  </AppLayout>
)

export default compose(forRoute('speaker'), protect)(Speaker)
