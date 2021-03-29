import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import EventPage from 'features/event/page'
import ProposalsList from 'features/proposal/list'
import Proposal from 'features/proposal/page'
import LoadingIndicator from 'components/loader'
import { useOrganizerEvent } from 'data/event'
import EventEdit from './eventEdit'

const Event = () => {
  const { eventId } = useParams()
  const { data: event, isLoading, isError, error } = useOrganizerEvent(eventId)

  if (isLoading) return <LoadingIndicator />

  if (isError) return <div>An unexpected error has occurred: {error.message}</div>

  return (
    <Routes>
      <Route path="/" element={<EventPage event={event} />} />
      <Route path="/edit/*" element={<EventEdit event={event} />} />
      <Route path="/proposals" element={<ProposalsList event={event} />} />
      <Route path="/proposals/:proposalId" element={<Proposal event={event} />} />
    </Routes>
  )
}

export default memo(Event)
