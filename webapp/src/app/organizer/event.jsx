import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import EventPage from 'features/event/page'
import ProposalsList from 'features/proposal/list'
import Proposal from 'features/proposal/page'
import EventEdit from './eventEdit'

const Event = () => (
  <Routes>
    <Route path="/" element={<EventPage />} />
    <Route path="/edit/*" element={<EventEdit />} />
    <Route path="/proposals" element={<ProposalsList />} />
    <Route path="/proposals/:proposalIndex" element={<Proposal />} />
  </Routes>
)

export default memo(Event)
