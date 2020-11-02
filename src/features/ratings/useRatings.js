/* eslint-disable import/prefer-default-export */
import isEmpty from 'lodash/isEmpty'
import { useMutation, useQuery, useQueryCache } from 'react-query'
import { addRating, deleteRating, getRatings, getUserRating } from 'firebase/ratings'
import { updateRating } from 'firebase/proposals'
import { useAuth } from 'features/auth'

export const useUserRating = (eventId, proposalId) => {
  const { user } = useAuth()
  return useQuery(['rating', eventId, proposalId, user?.uid], async () => {
    if (!eventId || !proposalId || !user?.uid) return null
    return getUserRating(eventId, proposalId, user.uid)
  })
}

export const useRatings = (eventId, proposalId) => {
  return useQuery(['ratings', eventId, proposalId], async () => {
    if (!eventId || !proposalId) return null
    return getRatings(eventId, proposalId)
  })
}

const getRatingsAverage = (ratings) => {
  const usersRatings = ratings.filter((r) => r.feeling !== 'noopinion')
  if (isEmpty(usersRatings)) return null
  return usersRatings.map((r) => r.rating).reduce((p, c) => p + c, 0) / usersRatings.length
}

const getFeelingsCount = (feeling) => (ratings) => {
  if (isEmpty(ratings)) return null
  return ratings.filter((r) => r.feeling === feeling).length
}

export const useRateProposal = (eventId, proposalId) => {
  const { user } = useAuth()
  const cache = useQueryCache()
  return useMutation(async ([rating, feeling]) => {
    const rated = !!rating || !!feeling
    if (rated) {
      await addRating(eventId, proposalId, user.uid, { rating, feeling })
    } else {
      await deleteRating(eventId, proposalId, user.uid)
    }

    // update ratings on the proposal
    const ratings = await getRatings(eventId, proposalId)
    const avgRating = getRatingsAverage(ratings)
    const loves = getFeelingsCount('love')(ratings)
    const hates = getFeelingsCount('hate')(ratings)
    const noopinion = getFeelingsCount('noopinion')(ratings)
    const ratingUpdated = {
      rating: avgRating,
      loves,
      hates,
      noopinion,
    }
    await updateRating(eventId, proposalId, user.uid, ratingUpdated, rated)
    await cache.invalidateQueries(['rating', eventId, proposalId, user?.uid])
  })
}
