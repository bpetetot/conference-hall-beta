import { call, put, select, takeLatest } from 'redux-saga/effects'

import { getUserId } from 'redux/auth'
import ratingsData from 'redux/data/ratings'
import { getRatings, addRating } from './ratings.firebase'

function* fetchRatings({ eventId, proposalId }) {
  // wipe current ratings
  yield put(ratingsData.reset())
  // save in database
  const ratings = yield call(getRatings, eventId, proposalId)
  // update in the store
  yield put(ratingsData.set(ratings))
}

export function* saveRating({ eventId, proposalId, rating }) {
  // select user id in the state
  const uid = yield select(getUserId)
  // save in database
  yield call(addRating, eventId, proposalId, uid, rating)
  // update in the store
  yield put(ratingsData.addOrUpdate({ uid, ...rating }))
}

export default function* eventSagas() {
  yield takeLatest('FETCH_PROPOSAL_RATINGS', ({ payload }) => fetchRatings(payload))
}
