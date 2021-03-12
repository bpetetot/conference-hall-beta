import React from 'react'
import { useParams } from 'react-router'

import { useOrganizerEvent } from 'data/event'
import { useOrganizerProposal } from 'data/proposal'
import LoadingIndicator from 'components/loader'

import Actions from './actions'
import Ratings from './ratings'
import Speaker from './speaker'
import Talk from './talk'

import './proposal.css'

const Proposal = () => {
  const { eventId, proposalIndex } = useParams()

  const { data: event } = useOrganizerEvent(eventId)
  const { data: result, isLoading } = useOrganizerProposal(eventId, proposalIndex)
  if (!event || isLoading) {
    return <LoadingIndicator />
  }
  const { proposal, nextProposal, previousProposal } = result

  if (!proposal) {
    return <div className="proposal">No more proposal found. Go back to the list.</div>
  }

  return (
    <div className="proposal">
      <Actions className="proposal-actions" event={event} proposal={proposal} />
      <Ratings
        className="proposal-ratings"
        proposal={proposal}
        nextProposal={nextProposal}
        previousProposal={previousProposal}
      />
      {event.displayProposalsSpeakers && (
        <div className="proposal-speakers card">
          {proposal.speakers.map((speaker) => (
            <Speaker key={speaker.id} speaker={speaker} />
          ))}
        </div>
      )}
      <Talk className="proposal-talk" proposal={proposal} />
    </div>
  )
}

export default Proposal
