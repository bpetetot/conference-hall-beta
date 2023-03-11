import React from 'react'
import PropTypes from 'prop-types'

import { useAuth } from 'features/auth'

import Talk from './talk'
import Speakers from './speakers'
import Ratings from './ratings'
import Actions from './actions'

import './proposal.css'

function Proposal({ eventId, proposal, deliberationActive, blindRating }) {
  const { user } = useAuth()

  return (
    <div className="proposal">
      <Actions className="proposal-actions" eventId={eventId} proposal={proposal} />
      <Ratings
        className="proposal-ratings"
        userId={user.uid}
        eventId={eventId}
        proposalId={proposal.id}
      />
      {!blindRating && <Speakers className="proposal-speakers" proposal={proposal} />}
      <Talk
        className="proposal-talk"
        eventId={eventId}
        proposal={proposal}
        deliberationActive={deliberationActive}
      />
    </div>
  )
}

Proposal.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
  deliberationActive: PropTypes.bool,
  blindRating: PropTypes.bool,
}

Proposal.defaultProps = {
  proposal: {},
  deliberationActive: false,
  blindRating: false,
}

export default Proposal
