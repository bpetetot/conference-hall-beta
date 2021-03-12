import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import EventPage from 'features/event/page'
import SurveyForm from 'features/survey/page'
import SubmitTalkSelection from 'features/submission/selection-talk'
import SubmissionWizard from 'features/submission/wizard'
import SubmissionsList from 'features/submission/list'
import SubmissionPage from 'features/submission/page'

const Event = () => (
  <Routes>
    <Route path="/" element={<EventPage />} />
    <Route path="/survey" element={<SurveyForm />} />
    <Route path="/submission" element={<SubmitTalkSelection />} />
    <Route path="/submission/:talkId" element={<SubmissionWizard />} />
    <Route path="/submissions" element={<SubmissionsList />} />
    <Route path="/submissions/:talkId" element={<SubmissionPage />} />
  </Routes>
)

export default memo(Event)
