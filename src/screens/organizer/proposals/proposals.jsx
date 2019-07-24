import React from 'react'
import PropTypes from 'prop-types'

import ProposalsHeader from './proposalsHeader'
import ProposalsToolbar from './proposalsToolbar'
import ProposalsList from './proposalsList'
import ProposalsCards from './proposalsCards'
import ProposalsPaging from './proposalsPaging'

const Proposals = ({ eventId, proposalsSelection, nbProposals }) => {
  const title = nbProposals > 0 ? `Proposals (${nbProposals})` : 'Proposals'
  return (
    <div>
      <ProposalsHeader eventId={eventId} title={title} />
      <ProposalsToolbar eventId={eventId} selection={proposalsSelection} />
      <ProposalsList eventId={eventId} />
      <ProposalsCards eventId={eventId} />
      <ProposalsPaging />
    </div>
  )
}

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
  nbProposals: PropTypes.number.isRequired,
  proposalsSelection: PropTypes.array.isRequired,
}

export default Proposals
