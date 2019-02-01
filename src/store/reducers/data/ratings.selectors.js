/* eslint-disable import/prefer-default-export */
import isEmpty from 'lodash/isEmpty'

export const getRatingsAverage = (ratings) => {
  const usersRatings = ratings.filter(r => r.feeling !== 'noopinion')
  if (isEmpty(usersRatings)) return null
  return usersRatings.map(r => r.rating).reduce((p, c) => p + c, 0) / usersRatings.length
}

export const getFeelingsCount = feeling => (ratings) => {
  if (isEmpty(ratings)) return null
  return ratings.filter(r => r.feeling === feeling).length
}
