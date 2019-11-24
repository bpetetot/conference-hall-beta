import { inject } from '@k-ramel/react'

import { getRatingsProgress } from 'store/reducers/data/ratings.selectors'

import RatingsProgress from './ratingsProgress'

const mapStore = store => {
  const { uid } = store.auth.get()
  const progress = getRatingsProgress(uid, store)
  return progress
}

export default inject(mapStore)(RatingsProgress)
