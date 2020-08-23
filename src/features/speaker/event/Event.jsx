import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { useAuth } from 'features/auth'
import EventPage from 'features/event'
import SpeakerSurvey from './survey'
import SubmissionWizard from './submitWizard'
import SpeakerEventSubmissions from './submissions'
import SpeakerTalkSubmited from './submission'

const Event = () => {
  const { user } = useAuth()
  const { eventId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<EventPage eventId={eventId} />} />
      <Route path="/survey" element={<SpeakerSurvey eventId={eventId} />} />
      <Route path="/submission" element={<SubmissionWizard eventId={eventId} />} />
      <Route
        path="/submissions"
        element={<SpeakerEventSubmissions eventId={eventId} userId={user.uid} />}
      />
      <Route path="/submissions/:talkId" element={<SpeakerTalkSubmited eventId={eventId} />} />
    </Routes>
  )
}

export default memo(Event)
