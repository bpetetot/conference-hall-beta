import React from 'react'
import PropTypes from 'prop-types'

import { List, ListItem } from 'components/list'
import ProposalSubtitle from './proposalSubtitle'
import ProposalInfo from './proposalInfo'
import './proposalsList.css'

const Proposals = ({ eventId, proposals, onSelect }) => (
  <List
    className="event-proposals"
    array={proposals}
    renderRow={proposal => (
      <ListItem
        key={proposal.id}
        title={proposal.title}
        subtitle={<ProposalSubtitle eventId={eventId} proposal={proposal} />}
        info={<ProposalInfo proposal={proposal} />}
        onSelect={() => onSelect(eventId, proposal.id)}
      />
    )}
  />
)

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposals: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
}

Proposals.defaultProps = {
  proposals: [],
}

export default Proposals
