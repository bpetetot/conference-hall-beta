import { call, select, takeLatest } from 'redux-saga/effects'

import store from 'store/store'
import { getRatingsAverage } from 'store/data/ratings.selectors'
import { getRouterParam } from 'store/router'
import { getRatings, addRating } from 'firebase/ratings'
import { updateRating } from 'firebase/proposals'

function* fetchRatings({ eventId, proposalId }) {
  // wipe current ratings
  store.data.ratings.reset()
  // save in database
  const ratings = yield call(getRatings, eventId, proposalId)
  // update in the store
  store.data.ratings.set(ratings)
}

function* rateProposal(rating) {
  // select needed inputs in the state
  const { uid } = store.auth.get()
  const eventId = yield select(getRouterParam('eventId'))
  const proposalId = yield select(getRouterParam('proposalId'))
  // add the rating in database and store
  yield call(addRating, eventId, proposalId, uid, rating)
  store.data.ratings.addOrUpdate({ uid, ...rating })
  // compute average rating
  const avgRating = getRatingsAverage(store)
  // save the rating average in database database and store
  yield call(updateRating, eventId, proposalId, uid, avgRating)
  store.data.proposals.update({ id: proposalId, rating: avgRating })
}

export default function* eventSagas() {
  yield takeLatest('FETCH_PROPOSAL_RATINGS', ({ payload }) => fetchRatings(payload))
  yield takeLatest('RATE_PROPOSAL', ({ payload }) => rateProposal(payload))
}
