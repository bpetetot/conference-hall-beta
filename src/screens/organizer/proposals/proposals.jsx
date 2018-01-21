import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import { List, ListItem } from 'components/list'
import ProposalFilters from './proposalFilters'
import ProposalSubtitle from './proposalSubtitle'
import ProposalInfo from './proposalInfo'
import './proposals.css'

const Proposals = ({ eventId, proposals, onSelect }) => (
  <div>
    <Titlebar icon="fa fa-paper-plane" title="Proposals" />
    <ProposalFilters />
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
  </div>
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
