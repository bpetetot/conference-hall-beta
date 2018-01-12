import React from 'react'

import Titlebar from 'components/titlebar'
import Talk from './talk.container'

import './proposals.css'

const Proposals = ({ proposals }) => (
  <div>
    <Titlebar icon="fa fa-paper-plane" title="Proposals" />
    <div className="event-proposals card">
      {proposals.map(id => <Talk key={id} talkId={id} onSelect={console.log} />)}
    </div>
  </div>
)

export default Proposals
