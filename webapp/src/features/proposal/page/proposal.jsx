import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

import { useOrganizerProposal, useOrganizerProposalsIds } from 'data/proposal'
import LoadingIndicator from 'components/loader'

import Actions from './actions'
import Ratings from './ratings'
import Speaker from './speaker'
import Talk from './talk'

import './proposal.css'

function getNextPreviousProposal(proposalId, searchIds) {
  if (!searchIds) {
    return { previous: undefined, next: undefined }
  }
  const proposalIndex = searchIds.findIndex((id) => id === proposalId)
  if (proposalIndex === -1) {
    return { previous: undefined, next: searchIds[0] }
  }
  if (proposalIndex === 0) {
    return { previous: undefined, next: searchIds[proposalIndex + 1] }
  }
  if (proposalIndex === searchIds.length - 1) {
    return { previous: searchIds[proposalIndex - 1], next: undefined }
  }
  return { previous: searchIds[proposalIndex - 1], next: searchIds[proposalIndex + 1] }
}

const Proposal = ({ event }) => {
  const { proposalId } = useParams()
  const { data: proposal, isLoading, isError, error } = useOrganizerProposal(event.id, proposalId)

  const { data: searchIds } = useOrganizerProposalsIds(event.id)
  const { previous, next } = getNextPreviousProposal(proposal?.id, searchIds)

  if (!event || isLoading) return <LoadingIndicator />
  if (isError) return <div>An unexpected error has occurred: {error.message}</div>

  if (!proposal) {
    return <div className="proposal">No more proposal found. Go back to the list.</div>
  }

  return (
    <div className="proposal">
      <Actions className="proposal-actions" event={event} proposal={proposal} />
      <Ratings
        className="proposal-ratings"
        proposal={proposal}
        nextProposal={next}
        previousProposal={previous}
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

Proposal.propTypes = {
  event: PropTypes.object.isRequired,
}

export default Proposal
