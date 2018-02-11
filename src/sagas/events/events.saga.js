import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'

import store from 'redux/store'
import { getUserId } from 'redux/auth'
import { getRouterParam } from 'redux/router'
import eventCrud, { fetchUserEvents } from './events.firebase'

function* createEvent(event) {
  const FORM = 'event-create'
  try {
    // indicate start submitting form
    yield put(startSubmit(FORM))
    // get user id
    const uid = yield select(getUserId)
    // create event into database
    const ref = yield call(eventCrud.create, { ...event, owner: uid })
    // reset form
    yield put(reset(FORM))
    // set form submitted
    yield put(stopSubmit(FORM))
    // go to event page
    yield put(push(`/organizer/event/${ref.id}`))
  } catch (error) {
    yield put(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
}

function* updateEvent(form, event) {
  try {
    // indicate start submitting form
    yield put(startSubmit(form))
    // update event into database
    yield call(eventCrud.update, event)
    // update event in store
    store.data.events.update(event)
    // set form submitted
    yield put(stopSubmit(form))
  } catch (error) {
    yield put(stopSubmit(form, { _error: error.message }))
    throw error
  }
}

function* fetchEvent({ eventId }) {
  if (!eventId) return
  // check if already in the store
  const current = store.data.events.get(eventId)
  if (current && current.id === eventId) return
  // fetch event from id
  const ref = yield call(eventCrud.read, eventId)
  if (ref.exists) {
    store.data.events.add({ id: eventId, ...ref.data() })
  } else {
    yield put({ type: 'EVENT_NOT_FOUND', payload: { eventId } })
  }
}

function* onLoadEventPage() {
  // get event id from router
  const eventId = yield select(getRouterParam('eventId'))
  yield put({ type: 'FETCH_EVENT', payload: { eventId } })
}

function* onLoadOrganizerEventsPage() {
  const uid = yield select(getUserId)
  const result = yield call(fetchUserEvents, uid)
  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  // set events in the store
  store.data.events.set(events)
  // set events id to the organizer event store
  store.ui.organizer.myEvents.reset()
  store.ui.organizer.myEvents.set(events)
}

function* onOpenSpeakerEventPage({ eventId }) {
  yield put({ type: 'SPEAKER/SET_EVENT', payload: { eventId } })
  yield put(push(`/speaker/event/${eventId}`))
}

function* onOpenOrganizerEventPage({ eventId }) {
  store.data.proposals.reset()
  yield put(push(`/organizer/event/${eventId}`))
}

export default function* eventSagas() {
  yield takeLatest('SUBMIT_CREATE_EVENT_FORM', ({ payload }) => createEvent(payload))
  yield takeLatest('SUBMIT_UPDATE_EVENT_FORM', ({ payload }) => updateEvent('event-edit', payload))
  yield takeLatest('SUBMIT_UPDATE_CFP_FORM', ({ payload }) => updateEvent('cfp-edit', payload))
  yield takeLatest('ON_LOAD_EVENT_PAGE', onLoadEventPage)
  yield takeLatest('ON_LOAD_ORGANIZER_EVENTS_PAGE', onLoadOrganizerEventsPage)
  yield takeLatest('SPEAKER/OPEN_EVENT_PAGE', ({ payload }) => onOpenSpeakerEventPage(payload))
  yield takeLatest('ORGANIZER/OPEN_EVENT_PAGE', ({ payload }) => onOpenOrganizerEventPage(payload))
  yield takeEvery('FETCH_EVENT', ({ payload }) => fetchEvent(payload))
}
