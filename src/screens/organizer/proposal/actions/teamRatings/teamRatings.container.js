import { inject } from '@k-ramel/react'

import TeamRatings from './teamRatings'

const mapStore = (store, { proposalId }) => {
  const {
    rating, loves, hates, noopinion,
  } = store.data.proposals.get(proposalId) || {}
  return {
    total: rating,
    loves,
    hates,
    noopinion,
    ratings: store.data.ratings.getAsArray(),
  }
}
export default inject(mapStore)(TeamRatings)
