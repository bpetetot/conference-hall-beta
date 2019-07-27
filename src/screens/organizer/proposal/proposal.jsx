import React from 'react'
import PropTypes from 'prop-types'

import Talk from './talk'
import Speakers from './speakers'
import Ratings from './ratings'
import Actions from './actions'

import './proposal.css'

const Proposal = ({ eventId, proposal, deliberationActive }) => (
  <div className="proposal">
    <Actions className="proposal-actions" eventId={eventId} proposalId={proposal.id} title={proposal.title} />
    <Ratings className="proposal-ratings" eventId={eventId} proposal={proposal} />
    <Speakers className="proposal-speakers" eventId={eventId} proposal={proposal} />
    <Talk className="proposal-talk" eventId={eventId} proposal={proposal} deliberationActive={deliberationActive} />
  </div>
)

Proposal.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
  deliberationActive: PropTypes.bool,
}

Proposal.defaultProps = {
  proposal: {},
  deliberationActive: false,
}

export default Proposal
