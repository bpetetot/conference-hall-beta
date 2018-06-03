import React from 'react'
import PropTypes from 'prop-types'

import { withSizes } from 'styles/utils'
import { List, ListItem } from 'components/list'
import ProposalSubtitle from './proposalSubtitle'
import ProposalInfo from './proposalInfo'
import './proposalsList.css'

const Proposals = ({
  eventId, proposals, onSelect, isMobile,
}) => (
  <List
    className="event-proposals"
    array={proposals}
    renderRow={proposal => (
      <ListItem
        key={proposal.id}
        title={proposal.title}
        subtitle={!isMobile && <ProposalSubtitle eventId={eventId} proposal={proposal} />}
        info={<ProposalInfo proposal={proposal} isMobile={isMobile} />}
        onSelect={() => onSelect(eventId, proposal.id)}
      />
    )}
  />
)

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposals: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
}

Proposals.defaultProps = {
  proposals: [],
}

export default withSizes(Proposals)
