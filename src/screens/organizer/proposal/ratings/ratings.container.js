/* eslint-disable prefer-destructuring */
import { inject } from '@k-ramel/react'

import Ratings from './ratings'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  const proposals = store.data.proposals.getKeys()
  const { proposalIndex } = store.ui.organizer.proposal.get()

  return {
    isLoaded: store.data.ratings.isInitialized(),
    ...store.data.ratings.get(uid),
    hasNext: proposalIndex + 1 < proposals.length,
    hasPrevious: proposalIndex - 1 >= 0,
    onRating: (rating, feeling) =>
      store.dispatch({ type: '@@ui/RATE_PROPOSAL', payload: { rating, feeling } }),
    onNext: () => store.dispatch('@@ui/ON_NEXT_PROPOSAL'),
    onPrevious: () => store.dispatch('@@ui/ON_PREVIOUS_PROPOSAL'),
  }
}

export default inject(mapStore)(Ratings)
