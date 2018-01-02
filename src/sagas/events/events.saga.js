import { takeLatest, put, select } from 'redux-saga/effects'

import eventsData from 'redux/data/events'
import { getUserId } from 'redux/auth'
import { fetchUserEvents } from './events.firebase'

function* fetchMyEvents() {
  const uid = yield select(getUserId)

  const result = yield fetchUserEvents(uid)

  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))

  yield put(eventsData.set(events))
}

export default function* eventSagas() {
  yield takeLatest('MY_EVENTS_SEARCH', fetchMyEvents)
}
