import React, { memo } from 'react'
import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'

import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'
import Profile from 'screens/components/profile'
import { useAuth, protect } from 'features/auth'

import Sidebar from './sidebar'
import MyTalks from './talks'
import { TalkEdit, TalkCreate } from './talk/form'
import TalkSubmission from './talk/submission'
import Talk from './talk/page'
import EventPage from './event/page'
import EventSubmitWizard from './event/submitWizard'
import EventSubmissions from './event/submissions'
import EventSubmissionPage from './event/submission'
import EventSurvey from './event/survey'

const Speaker = () => {
  const { user } = useAuth()
  return (
    <AppLayout sidebar={<Sidebar />}>
      <Profile />
      <TalkCreate userId={user.uid} />
      <TalkEdit />
      <TalkSubmission />
      <Talk />
      <MyTalks userId={user.uid} />
      <EventPage />
      <EventSubmitWizard userId={user.uid} />
      <EventSubmissions userId={user.uid} />
      <EventSubmissionPage />
      <EventSurvey />
      <Contributors />
    </AppLayout>
  )
}

export default compose(memo, forRoute('speaker'), protect)(Speaker)
