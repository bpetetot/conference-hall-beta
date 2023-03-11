import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import EventPage from 'features/event/page'
import ProposalsList from 'features/proposal/list'
import Proposal from 'features/proposal/page'
import EventEdit from './eventEdit'

function Event() {
  const { eventId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<EventPage eventId={eventId} />} />
      <Route path="/edit/*" element={<EventEdit eventId={eventId} />} />
      <Route path="/proposals" element={<ProposalsList eventId={eventId} />} />
      <Route path="/proposals/:proposalId" element={<Proposal eventId={eventId} />} />
    </Routes>
  )
}

export default memo(Event)
