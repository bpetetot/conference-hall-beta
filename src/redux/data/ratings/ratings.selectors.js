import values from 'lodash/values'

import ratingsData from './ratings'

export const getRatingsAverage = (state) => {
  const ratings = ratingsData.getAsArray(state)
  return (
    values(ratings)
      .map(r => r.rating)
      .reduce((p, c) => p + c, 0) / ratings.length
  )
}

export const getUserRating = uid => (state) => {
  const { rating, feeling } = ratingsData.get(uid)(state) || {}
  if (feeling === 'love') return rating + 1
  return rating
}
