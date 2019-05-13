import React from 'react'
import PropTypes from 'prop-types'

import { withSizes } from 'styles/utils'
import { List, ListItem } from 'components/list'
import Checkbox from 'components/form/checkbox'
import ProposalSubtitle from './proposalSubtitle'
import ProposalInfo from './proposalInfo'
import './proposalsList.css'

const Proposals = ({
  eventId, proposals, proposalsSelection, onSelect, onAddProposalToSelection, isMobile,
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
        renderActions={() => (
          <Checkbox
            key={proposal.id}
            onClick={() => onAddProposalToSelection(proposal.id)}
            label=""
            name=""
            value={!!proposalsSelection.includes(proposal.id)}
            disabled={proposal.emailStatus === 'delivered'}
          />
        )}
      />
    )}
  />
)

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposals: PropTypes.arrayOf(PropTypes.object),
  proposalsSelection: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  onAddProposalToSelection: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
}

Proposals.defaultProps = {
  proposals: [],
  proposalsSelection: [],
}

export default withSizes(Proposals)
