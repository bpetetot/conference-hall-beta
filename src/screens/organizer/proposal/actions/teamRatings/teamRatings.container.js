import { inject } from '@k-ramel/react'

import TeamRatings from './teamRatings'

const mapStore = (store, { id }) => {
  const { rating, loves, hates } = store.data.proposals.get(id) || {}
  return {
    total: rating,
    loves,
    hates,
    ratings: store.data.ratings.getAsArray(),
  }
}
export default inject(mapStore)(TeamRatings)
