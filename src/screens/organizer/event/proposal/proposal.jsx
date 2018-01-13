import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import Talk from './talk'
import Speakers from './speakers'
import Votes from './votes'
import './proposal.css'

const Proposal = ({ eventId, proposal }) => (
  <div className="proposal">
    <Header className="proposal-header" eventId={eventId} proposal={proposal} />
    <Speakers className="proposal-speakers" eventId={eventId} proposal={proposal} />
    <Talk className="proposal-talk" eventId={eventId} proposal={proposal} />
    <Votes className="proposal-votes" eventId={eventId} proposal={proposal} />
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
