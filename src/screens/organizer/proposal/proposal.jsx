import React from 'react'
import PropTypes from 'prop-types'

import Talk from './talk'
import Speakers from './speakers'
import Ratings from './ratings'
import Actions from './actions'
import './proposal.css'

const Proposal = ({ eventId, proposal }) => (
  <div className="proposal">
    <Ratings className="proposal-ratings" eventId={eventId} proposal={proposal} />
    <div className="proposal-sidebar">
      <Actions className="proposal-actions" eventId={eventId} proposal={proposal} />
      <Speakers className="proposal-speakers" eventId={eventId} proposal={proposal} />
    </div>
    <Talk className="proposal-talk" eventId={eventId} proposal={proposal} />
  </div>
)

Proposal.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
}

Proposal.defaultProps = {
  proposal: {},
}

export default Proposal
