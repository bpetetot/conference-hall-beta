import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import EventPage from 'features/event'
import SpeakerSurvey from './survey'
import SubmissionWizard from './submitWizard'

const Event = () => {
  const { eventId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<EventPage eventId={eventId} />} />
      <Route path="/survey" element={<SpeakerSurvey eventId={eventId} />} />
      <Route path="/submission" element={<SubmissionWizard eventId={eventId} />} />
    </Routes>
  )
}

export default memo(Event)
