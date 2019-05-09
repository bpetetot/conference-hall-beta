import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import ProposalsToolbar from './proposalsToolbar'
import ProposalsList from './proposalsList'
import ProposalsCards from './proposalsCards'
import ProposalsPaging from './proposalsPaging'

const Proposals = ({ eventId, proposalsSelection, nbProposals }) => {
  const title = nbProposals > 0 ? `Proposals (${nbProposals})` : 'Proposals'
  return (
    <div>
      <Titlebar icon="fa fa-paper-plane" title={title} className="no-print" />
      <ProposalsToolbar selection={proposalsSelection} eventId={eventId} />
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
