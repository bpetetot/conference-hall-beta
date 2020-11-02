import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import EventPage from 'features/event/page'
import SurveyForm from 'features/survey/form'
import SubmitWizard from 'features/submission/wizard-event'
import SubmissionsList from 'features/submission/list'
import SubmissionPage from 'features/submission/page'

const Event = () => {
  const { eventId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<EventPage eventId={eventId} />} />
      <Route path="/survey" element={<SurveyForm eventId={eventId} />} />
      <Route path="/submission" element={<SubmitWizard eventId={eventId} />} />
      <Route path="/submissions" element={<SubmissionsList eventId={eventId} />} />
      <Route path="/submissions/:talkId" element={<SubmissionPage eventId={eventId} />} />
    </Routes>
  )
}

export default memo(Event)
