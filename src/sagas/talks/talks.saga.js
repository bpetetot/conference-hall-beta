import { takeLatest, put, select } from 'redux-saga/effects'

import talksData from 'redux/data/talks'
import { getUserId } from 'redux/auth'
import { fetchUserTalks } from './talks.firebase'

function* fetchMyTalks() {
  const uid = yield select(getUserId)

  const result = yield fetchUserTalks(uid)

  const talks = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))

  yield put(talksData.set(talks))
}

export default function* eventSagas() {
  yield takeLatest('MY_TALKS_SEARCH', fetchMyTalks)
}
