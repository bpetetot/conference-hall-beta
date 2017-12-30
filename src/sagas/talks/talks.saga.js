import { takeLatest, put, select } from 'redux-saga/effects'

import userData from 'redux/data/user'
import talksData from 'redux/data/talks'
import { fetchUserTalks } from './talks.firebase'

function* fetchMyTalks() {
  // get user id
  const { uid } = yield select(userData.get())

  const result = yield fetchUserTalks(uid)

  const talks = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))

  yield put(talksData.set(talks))
}

export default function* eventSagas() {
  yield takeLatest('MY_TALKS_SEARCH', fetchMyTalks)
}
