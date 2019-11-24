/* eslint-disable import/prefer-default-export */
import isEmpty from 'lodash/isEmpty'

export const getRatingsAverage = ratings => {
  const usersRatings = ratings.filter(r => r.feeling !== 'noopinion')
  if (isEmpty(usersRatings)) return null
  return usersRatings.map(r => r.rating).reduce((p, c) => p + c, 0) / usersRatings.length
}

export const getFeelingsCount = feeling => ratings => {
  if (isEmpty(ratings)) return null
  return ratings.filter(r => r.feeling === feeling).length
}

export const getRatingsProgress = (uid, store) => {
  const proposals = store.data.proposals.getAsArray()

  if (isEmpty(proposals)) return {}

  const rated = proposals.reduce((ratings, { usersRatings }) => {
    if (usersRatings && usersRatings[uid]) {
      return ratings + 1
    }
    return ratings
  }, 0)

  return {
    rated,
    total: proposals.length,
  }
}
