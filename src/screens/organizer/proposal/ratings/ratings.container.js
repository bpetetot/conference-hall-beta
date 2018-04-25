/* eslint-disable prefer-destructuring */
import { inject } from '@k-ramel/react'

import Ratings from './ratings'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  return {
    isLoaded: store.data.ratings.isInitialized(),
    ...store.data.ratings.get(uid),
    onRating: (rating, feeling) => {
      store.dispatch({ type: '@@ui/RATE_PROPOSAL', payload: { rating, feeling } })
    },
  }
}

export default inject(mapStore)(Ratings)
