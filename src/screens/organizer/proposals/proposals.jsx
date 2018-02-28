import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import ProposalFilters from './proposalFilters'
import ProposalsList from './proposalsList'

const Proposals = ({ eventId, nbProposals }) => {
  const title = nbProposals > 0 ? `Proposals (${nbProposals})` : 'Proposals'
  return (
    <div>
      <Titlebar icon="fa fa-paper-plane" title={title}>
        <ProposalFilters eventId={eventId} />
      </Titlebar>
      <ProposalsList eventId={eventId} />
    </div>
  )
}

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
  nbProposals: PropTypes.number.isRequired,
}

export default Proposals
