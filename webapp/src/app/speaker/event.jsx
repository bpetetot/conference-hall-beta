import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import EventPage from 'features/event/page'
import SurveyForm from 'features/survey/form'
import SubmitTalkSelection from 'features/submission/selection-talk'
import SubmissionWizard from 'features/submission/wizard'
import SubmissionsList from 'features/submission/list'
import SubmissionPage from 'features/submission/page'
import LoadingIndicator from 'components/loader'
import { useEvent } from 'data/event'

const Event = () => {
  const { eventId } = useParams()
  const { data: event, isLoading, isError, error } = useEvent(eventId)

  if (isLoading) return <LoadingIndicator />

  if (isError) return <div>An unexpected error has occurred: {error.message}</div>

  return (
    <Routes>
      <Route path="/" element={<EventPage event={event} />} />
      <Route path="/survey" element={<SurveyForm event={event} />} />
      <Route path="/submission" element={<SubmitTalkSelection event={event} />} />
      <Route path="/submission/:talkId" element={<SubmissionWizard event={event} />} />
      <Route path="/submissions" element={<SubmissionsList event={event} />} />
      <Route path="/submissions/:talkId" element={<SubmissionPage event={event} />} />
    </Routes>
  )
}

export default memo(Event)
