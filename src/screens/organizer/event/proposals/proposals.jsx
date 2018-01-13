import React from 'react'

import Titlebar from 'components/titlebar'
import List from 'components/list'
import ListItem from 'components/list/listItem'

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
          title={proposal.id}
          subtitle={proposal.id}
          info={proposal.id}
          onSelect={console.log}
        />
      )}
    />
  </div>
)

export default Proposals
