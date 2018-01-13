import React from 'react'
import Header from './header'
import Talk from './talk'
import Speakers from './speakers'
import Votes from './votes'
import './proposal.css'

const Proposal = () => (
  <div className="proposal">
    <Header className="proposal-header card" />
    <Speakers className="proposal-speakers" />
    <Talk className="proposal-talk" />
    <Votes className="proposal-votes" />
  </div>
)

export default Proposal
