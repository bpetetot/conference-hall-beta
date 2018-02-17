/* eslint-disable import/prefer-default-export */
import values from 'lodash/values'

export const getRatingsAverage = (store) => {
  const ratings = store.data.ratings.getAsArray()
  return (
    values(ratings)
      .map(r => r.rating)
      .reduce((p, c) => p + c, 0) / ratings.length
  )
}
