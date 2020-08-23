import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import SpeakerSurvey from './survey'

const Event = () => {
  const { eventId } = useParams()
  return (
    <Routes>
      <Route path="/survey" element={<SpeakerSurvey eventId={eventId} />} />
    </Routes>
  )
}

export default memo(Event)
