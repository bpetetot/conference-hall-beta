import { inject } from '@k-ramel/react'

import RatingsDrawer from './ratingsDrawer'

const mapStore = (store, { proposalId }) => {
  const { rating, loves, hates, noopinion } = store.data.proposals.get(proposalId) || {}
  return {
    total: rating,
    loves,
    hates,
    noopinion,
  }
}
export default inject(mapStore)(RatingsDrawer)
