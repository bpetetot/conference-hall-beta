import React from 'react'
import PropTypes from 'prop-types'

import { withSizes } from 'styles/utils'
import { List, ListItem } from 'components/list'
import ProposalSubtitle from './proposalSubtitle'
import ProposalInfo from './proposalInfo'
import './proposalsList.css'

const Proposals = ({
  eventId,
  proposals,
  proposalsSelection,
  deliberationActive,
  onSelect,
  onAddProposalToSelection,
  isMobile,
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
        onSelect={() => onSelect(proposal.id)}
        onCheckboxChange={() => onAddProposalToSelection(proposal.id)}
        checked={!!proposalsSelection.includes(proposal.id)}
        checkboxDisabled={!deliberationActive}
      />
    )}
  />
)

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposals: PropTypes.arrayOf(PropTypes.object),
  proposalsSelection: PropTypes.arrayOf(PropTypes.string),
  deliberationActive: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onAddProposalToSelection: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
}

Proposals.defaultProps = {
  proposals: [],
  proposalsSelection: [],
  deliberationActive: false,
}

export default withSizes(Proposals)
