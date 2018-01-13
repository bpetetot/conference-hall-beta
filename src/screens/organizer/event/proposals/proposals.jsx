import React from 'react'
import PropTypes from 'prop-types'
import Titlebar from 'components/titlebar'
import { List, ListItem } from 'components/list'
import ProposalSubtitle from './proposalSubtitle'
import ProposalInfo from './proposalInfo'
import './proposals.css'

const Proposals = ({ proposals }) => (
  <div>
    <Titlebar icon="fa fa-paper-plane" title="Proposals" />
    <List
      className="event-proposals"
      array={proposals}
      renderRow={proposal => (
        <ListItem
          key={proposal.id}
          title={proposal.title}
          subtitle={<ProposalSubtitle proposal={proposal} />}
          info={<ProposalInfo proposal={proposal} />}
          onSelect={() => console.log(proposal)}
        />
      )}
    />
  </div>
)

Proposals.propTypes = {
  proposals: PropTypes.arrayOf(PropTypes.object),
}

Proposals.defaultProps = {
  proposals: [],
}

export default Proposals
