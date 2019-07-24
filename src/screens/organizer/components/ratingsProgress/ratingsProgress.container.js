import { inject } from '@k-ramel/react'

import { getRatingsProgress } from 'store/reducers/data/ratings.selectors'

import RatingsProgress from './ratingsProgress'

const mapStore = (store, { eventId }) => {
  const { uid } = store.auth.get()
  const progress = getRatingsProgress(uid, store)
  const { deliberationActive } = store.data.events.get(eventId) || {}
  return {
    deliberationActive,
    ...progress,
  }
}

export default inject(mapStore)(RatingsProgress)
