/* eslint-disable prefer-destructuring */
import { inject } from 'k-ramel/react'

import { getUserId } from 'redux/auth'
import ratingsData from 'redux/data/ratings'
import { hasNext, hasPrevious } from 'redux/ui/organizer/proposal'
import Ratings from './ratings'

const mapStore = (store) => {
  const uid = getUserId(store.getState())
  return {
    isLoaded: ratingsData.isInitialized(store.getState()),
    ...ratingsData.get(uid)(store.getState()),
    hasNext: hasNext(store.getState()),
    hasPrevious: hasPrevious(store.getState()),
    onRating: (rating, feeling) =>
      store.dispatch({ type: 'RATE_PROPOSAL', payload: { rating, feeling } }),
    onNext: () => store.dispatch({ type: 'NEXT_PROPOSAL' }),
    onPrevious: () => store.dispatch({ type: 'PREVIOUS_PROPOSAL' }),
  }
}

export default inject(mapStore)(Ratings)
