import { getRatingsAverage, getFeelingsCount } from 'store/reducers/data/ratings.selectors'
import { getRatings, addRating, deleteRating } from '../../firebase/ratings'
import { updateRating } from '../../firebase/proposals'

export const fetchRatings = async (action, store) => {
  const { eventId, proposalId } = action.payload
  // wipe current ratings
  store.data.ratings.reset()
  // save in database
  const ratings = await getRatings(eventId, proposalId)
  // update in the store
  store.data.ratings.set(ratings)
}

export const rateProposal = async (action, store) => {
  const { rating, feeling, userId, eventId, proposalId } = action.payload

  // add or remove the rating in database and store
  const rated = !!rating || !!feeling
  if (rated) {
    await addRating(eventId, proposalId, userId, { rating, feeling })
    store.data.ratings.addOrUpdate({ uid: userId, rating, feeling })
  } else {
    await deleteRating(eventId, proposalId, userId)
    store.data.ratings.remove([userId])
  }

  // retrieve all ratings before updating proposal computed
  const ratings = await getRatings(eventId, proposalId)
  // compute average rating
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
  // save the rating average in database and store
  updateRating(eventId, proposalId, userId, ratingUpdated, rated)
  store.data.proposals.update({ id: proposalId, ...ratingUpdated })
}
