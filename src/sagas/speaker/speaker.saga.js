import { put, takeLatest, call, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import store from 'redux/store'
import userCrud from 'sagas/user/user.firebase'
import eventCrud from 'sagas/events/events.firebase'
import { getRouterParam } from 'redux/router'

/**
 * Set the contextual event for the speaker app
 * @param {object} eventId event id
 */
function* setCurrentEvent({ eventId }) {
  if (!eventId) return
  // check if its already in the store else fetch it
  let event = store.data.events.get(eventId)
  if (!event) {
    const ref = yield call(eventCrud.read, eventId)
    if (ref.exists) {
      event = ref.data()
      store.data.events.add(event)
    }
  }
  // fetch event
  if (event) {
    // set contextual event id
    store.ui.speaker.app.set({ currentEventId: eventId })
    // set it in localstorage (it will be persisted later)
    localStorage.setItem('currentEventId', eventId)
  } else {
    localStorage.removeItem('currentEventId', eventId)
  }
}

function* initSpeakerApp() {
  // check if an event id is in localstorage
  const localStorageEventId = localStorage.getItem('currentEventId')
  // check if an event id is in URL
  const routerEventId = yield select(getRouterParam('eventId'))
  // load the event
  yield put({
    type: 'SPEAKER/SET_EVENT',
    payload: { eventId: routerEventId || localStorageEventId },
  })
}

function* saveSpeakerProfile(profile) {
  const FORM = 'user-profile'
  try {
    // indicate start submitting form
    yield put(startSubmit(FORM))
    // update user data in database
    yield call(userCrud.update, profile)
    // update user data in the store
    store.data.users.update(profile)
    // set form submitted
    yield put(stopSubmit(FORM))
  } catch (error) {
    yield put(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
}

export default function* eventSagas() {
  yield takeLatest('SPEAKER/INIT_APP', initSpeakerApp)
  yield takeLatest('SPEAKER/SET_EVENT', ({ payload }) => setCurrentEvent(payload))
  yield takeLatest('SUBMIT_PROFILE_FORM', ({ payload }) => saveSpeakerProfile(payload))
}
