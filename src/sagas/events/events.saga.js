import { takeLatest, put } from 'redux-saga/effects'

import events from 'redux/data/organizer/events'

function* fetchMyEvents() {
  yield console.log('fetchMyEvents')
  yield put(events.set([{ id: '1', title: 'test' }]))
}

export default function* eventSagas() {
  yield takeLatest('MY_EVENTS_SEARCH', fetchMyEvents)
}
