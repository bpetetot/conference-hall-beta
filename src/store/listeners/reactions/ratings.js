import { reaction } from 'k-ramel'

import { getRatingsAverage, getFeelingsCount } from 'store/reducers/data/ratings.selectors'
import { getRouterParam } from 'store/reducers/router'
import { getRatings, addRating, deleteRating } from 'firebase/ratings'
import { updateRating } from 'firebase/proposals'

export const fetchRatings = reaction(async (action, store) => {
  const { eventId, proposalId } = action.payload
  // wipe current ratings
  store.data.ratings.reset()
  // save in database
  const ratings = await getRatings(eventId, proposalId)
  // update in the store
  store.data.ratings.set(ratings)
})

export const rateProposal = reaction(async (action, store) => {
  const rating = action.payload
  // select needed inputs in the state
  const { uid } = store.auth.get()
  const eventId = getRouterParam('eventId')(store.getState())
  const proposalId = getRouterParam('proposalId')(store.getState())
  // add or remove the rating in database and store
  if (!rating.rating && !rating.feeling) {
    await deleteRating(eventId, proposalId, uid)
    store.data.ratings.remove([uid])
  } else {
    await addRating(eventId, proposalId, uid, rating)
    store.data.ratings.addOrUpdate({ uid, ...rating })
  }
  // compute average rating
  const avgRating = getRatingsAverage(store)
  const loves = getFeelingsCount('love')(store)
  const hates = getFeelingsCount('hate')(store)
  const ratingUpdated = { rating: avgRating, loves, hates }
  // save the rating average in database database and store
  updateRating(eventId, proposalId, uid, ratingUpdated)
  store.data.proposals.update({ id: proposalId, ...ratingUpdated })
})
