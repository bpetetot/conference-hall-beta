import { reaction } from 'k-ramel'

import { getRatingsAverage } from 'store/reducers/data/ratings.selectors'
import { getRouterParam } from 'store/reducers/router'
import { getRatings, addRating } from 'firebase/ratings'
import { updateRating } from 'firebase/proposals'

// FIXME : only used in proposals
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
  // add the rating in database and store
  await addRating(eventId, proposalId, uid, rating)
  store.data.ratings.addOrUpdate({ uid, ...rating })
  // compute average rating
  const avgRating = getRatingsAverage(store)
  // save the rating average in database database and store
  updateRating(eventId, proposalId, uid, avgRating)
  store.data.proposals.update({ id: proposalId, rating: avgRating })
})
