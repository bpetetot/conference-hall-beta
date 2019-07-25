import React from 'react'
import PropTypes from 'prop-types'

import ProposalsHeader from './proposalsHeader'
import ProposalsFilters from './proposalsFilters'
import ProposalsToolbar from './proposalsToolbar'
import ProposalsList from './proposalsList'
import ProposalsCards from './proposalsCards'
import ProposalsPaging from './proposalsPaging'

const Proposals = ({ eventId }) => (
  <div>
    <ProposalsHeader eventId={eventId} />
    <ProposalsFilters />
    <ProposalsToolbar eventId={eventId} />
    <ProposalsList eventId={eventId} />
    <ProposalsCards eventId={eventId} />
    <ProposalsPaging />
  </div>
)

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default Proposals
