import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { useAuth } from 'features/auth'
import EventPage from 'features/event/page'
import SurveyForm from 'features/survey/page'
import SubmissionWizard from 'features/submission/wizard'
import SubmissionsList from 'features/submission/list'
import SubmissionPage from 'features/submission/page'

function Event() {
  const { user } = useAuth()
  const { eventId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<EventPage eventId={eventId} />} />
      <Route path="/survey" element={<SurveyForm eventId={eventId} />} />
      <Route path="/submission" element={<SubmissionWizard eventId={eventId} />} />
      <Route
        path="/submissions"
        element={<SubmissionsList eventId={eventId} userId={user.uid} />}
      />
      <Route path="/submissions/:talkId" element={<SubmissionPage eventId={eventId} />} />
    </Routes>
  )
}

export default memo(Event)
