/* eslint-disable prefer-destructuring */
import { inject } from '@k-ramel/react'

import Ratings from './ratings'

const mapStore = (store, { userId, eventId, proposalId }) => {
  const proposals = store.data.proposals.getKeys()
  const proposalIndex = proposals.indexOf(proposalId)

  const nextProposalId =
    proposalIndex + 1 < proposals.length ? proposals[proposalIndex + 1] : undefined
  const prevProposalId = proposalIndex - 1 >= 0 ? proposals[proposalIndex - 1] : undefined

  return {
    isLoaded: store.data.ratings.isInitialized(),
    ...store.data.ratings.get(userId),
    nextProposalId,
    prevProposalId,
    loadRatings: (event, proposal) => {
      store.dispatch({
        type: '@@ui/ON_LOAD_RATINGS',
        payload: { eventId: event, proposalId: proposal },
      })
    },
    onRating: (rating, feeling) => {
      store.dispatch({
        type: '@@ui/RATE_PROPOSAL',
        payload: { userId, rating, feeling, eventId, proposalId },
      })
    },
  }
}

export default inject(mapStore)(Ratings)
