/* eslint-disable import/prefer-default-export */
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
