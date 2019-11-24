import React from 'react'
import PropTypes from 'prop-types'

import Talk from './talk'
import Speakers from './speakers'
import Ratings from './ratings'
import Actions from './actions'

import './proposal.css'

const Proposal = ({ eventId, proposal, deliberationActive, blindRating }) => (
  <div className="proposal">
    <Actions
      className="proposal-actions"
      eventId={eventId}
      proposalId={proposal.id}
      title={proposal.title}
    />
    <Ratings className="proposal-ratings" eventId={eventId} proposal={proposal} />
    {!blindRating && (
      <Speakers className="proposal-speakers" eventId={eventId} proposal={proposal} />
    )}
    <Talk
      className="proposal-talk"
      eventId={eventId}
      proposal={proposal}
      deliberationActive={deliberationActive}
    />
  </div>
)

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
