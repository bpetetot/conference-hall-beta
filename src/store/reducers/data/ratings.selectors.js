/* eslint-disable import/prefer-default-export */
import values from 'lodash/values'

export const getRatingsAverage = (store) => {
  const ratings = store.data.ratings.getAsArray()
  if (!ratings || ratings.length === 0) return null
  return (
    values(ratings)
      .map(r => r.rating)
      .reduce((p, c) => p + c, 0) / ratings.length
  )
}

export const getFeelingsCount = feeling => (store) => {
  const ratings = store.data.ratings.getAsArray()
  if (!ratings || ratings.length === 0) return null
  return values(ratings).filter(r => r.feeling === feeling).length
}
