import { takeLatest, put, select } from 'redux-saga/effects'

import userData from 'redux/data/user'
import eventsData from 'redux/data/organizer/events'
import { fetchUserEvents } from './events.firebase'

function* fetchMyEvents() {
  // get user id
  const { uid } = yield select(userData.get())

  const result = yield fetchUserEvents(uid)

  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))

  yield put(eventsData.set(events))
}

export default function* eventSagas() {
  yield takeLatest('MY_EVENTS_SEARCH', fetchMyEvents)
}
