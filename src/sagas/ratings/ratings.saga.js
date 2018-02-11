import { call, select, takeLatest } from 'redux-saga/effects'

import ratingsData, { getRatingsAverage } from 'redux/data/ratings'
import proposalsData from 'redux/data/proposals'
import { getUserId } from 'redux/auth'
import { getRouterParam } from 'redux/router'
import { getRatings, addRating } from './ratings.firebase'
import { updateRating } from '../proposals/proposals.firebase'

function* fetchRatings({ eventId, proposalId }) {
  // wipe current ratings
  ratingsData.reset()
  // save in database
  const ratings = yield call(getRatings, eventId, proposalId)
  // update in the store
  ratingsData.set(ratings)
}

function* rateProposal(rating) {
  // select needed inputs in the state
  const uid = yield select(getUserId)
  const eventId = yield select(getRouterParam('eventId'))
  const proposalId = yield select(getRouterParam('proposalId'))
  // add the rating in database and store
  yield call(addRating, eventId, proposalId, uid, rating)
  ratingsData.addOrUpdate({ uid, ...rating })
  // compute average rating
  const avgRating = yield select(getRatingsAverage)
  // save the rating average in database database and store
  yield call(updateRating, eventId, proposalId, uid, avgRating)
  proposalsData.update({ id: proposalId, rating: avgRating })
}

export default function* eventSagas() {
  yield takeLatest('FETCH_PROPOSAL_RATINGS', ({ payload }) => fetchRatings(payload))
  yield takeLatest('RATE_PROPOSAL', ({ payload }) => rateProposal(payload))
}
