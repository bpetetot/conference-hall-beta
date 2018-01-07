import { put, takeLatest, select } from 'redux-saga/effects'

function* initSpeakerApp() {
  // check if an event is in query params
  const { event } = yield select(state => state.router.query)
  if (event) {
    yield put({ type: 'FETCH_EVENT', payload: event })
  }
}

export default function* eventSagas() {
  yield takeLatest('INIT_SPEAKER_APP', initSpeakerApp)
}
