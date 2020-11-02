/* eslint-disable import/prefer-default-export */
import isEmpty from 'lodash/isEmpty'

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
