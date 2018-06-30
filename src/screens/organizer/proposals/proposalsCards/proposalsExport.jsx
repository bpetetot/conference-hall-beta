import React from 'react'
import PropTypes from 'prop-types'

import ProposalCard from './card'

import './proposalsExport.css'

const ProposalsExport = ({ eventId, onSelect, proposals }) => (
  <div className="proposals-cards">
    {proposals.map(proposal => (
      <ProposalCard eventId={eventId} onSelect={onSelect} key={proposal.id} {...proposal} />
    ))}
  </div>
)

ProposalsExport.propTypes = {
  eventId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  proposals: PropTypes.arrayOf(PropTypes.any),
}

ProposalsExport.defaultProps = {
  proposals: [],
}

export default ProposalsExport
