import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import ProposalFilters from './proposalFilters'
import ProposalsList from './proposalsList'

const Proposals = ({ eventId }) => (
  <div>
    <Titlebar icon="fa fa-paper-plane" title="Proposals">
      <ProposalFilters eventId={eventId} />
    </Titlebar>
    <ProposalsList eventId={eventId} />
  </div>
)

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default Proposals
