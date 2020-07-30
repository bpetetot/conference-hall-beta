import { inject } from '@k-ramel/react'

import { getRatingsProgress } from 'store/reducers/data/ratings.selectors'

import RatingsProgress from './ratingsProgress'

const mapStore = (store, { userId }) => {
  const progress = getRatingsProgress(userId, store)
  return progress
}

export default inject(mapStore)(RatingsProgress)
