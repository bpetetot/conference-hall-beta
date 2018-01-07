import { put, takeLatest, select, call } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import speakerApp from 'redux/ui/speaker/app'
import usersData from 'redux/data/users'
import userCrud from 'sagas/user/user.firebase'
import eventCrud from 'sagas/events/events.firebase'
import eventsData from 'redux/data/events'

function* initSpeakerApp() {
  // check if an event is in query params
  const { eventId } = yield select(state => state.router.query)
  if (eventId) {
    // fetch event
    const ref = yield call(eventCrud.read, eventId)
    if (ref.exists) {
      // set event in store
      yield put(eventsData.add({ eventId, ...ref.data() }))
      // set contextual event id
      yield put(speakerApp.set({ currentEventId: eventId }))
    }
  }
}

function* saveSpeakerProfile(profile) {
  const FORM = 'user-profile'
  try {
    // indicate start submitting form
    yield put(startSubmit(FORM))
    // update user data in database
    yield call(userCrud.update, profile)
    // update user data in the store
    yield put(usersData.update(profile))
    // set form submitted
    yield put(stopSubmit(FORM))
  } catch (error) {
    yield put(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
}

export default function* eventSagas() {
  yield takeLatest('INIT_SPEAKER_APP', initSpeakerApp)
  yield takeLatest('SUBMIT_PROFILE_FORM', ({ payload }) => saveSpeakerProfile(payload))
}
