import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import Talk from './talk'
import Speakers from './speakers'
import Votes from './votes'
import './proposal.css'

const Proposal = ({ proposal }) => (
  <div className="proposal">
    <Header className="proposal-header" proposal={proposal} />
    <Speakers className="proposal-speakers" proposal={proposal} />
    <Talk className="proposal-talk" proposal={proposal} />
    <Votes className="proposal-votes" proposal={proposal} />
  </div>
)

Proposal.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.any),
}

Proposal.defaultProps = {
  proposal: {},
}

export default Proposal
