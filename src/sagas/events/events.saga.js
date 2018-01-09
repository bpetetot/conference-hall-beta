import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'

import { getUserId } from 'redux/auth'
import eventsData, { getEventIdFromRouterParam } from 'redux/data/events'
import organizerEvents from 'redux/ui/organizer/events'
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
    yield put(eventsData.update(event))
    // set form submitted
    yield put(stopSubmit(form))
  } catch (error) {
    yield put(stopSubmit(form, { _error: error.message }))
    throw error
  }
}

function* fetchEvent(id) {
  // check if already in the store
  const current = yield select(eventsData.get(id))
  if (current && current.id === id) return
  // fetch event from id
  const ref = yield call(eventCrud.read, id)
  if (ref.exists) {
    yield put(eventsData.add({ id, ...ref.data() }))
  } else {
    yield put({ type: 'EVENT_NOT_FOUND', payload: id })
  }
}

function* fetchEventFromRouterParams() {
  // get event id from router
  const id = yield select(getEventIdFromRouterParam)
  if (id) {
    yield fetchEvent(id)
  }
}

function* fetchOrganizerEvents() {
  const uid = yield select(getUserId)
  const result = yield fetchUserEvents(uid)
  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  // set events in the store
  yield put(eventsData.set(events))
  // set events id to the organizer event store
  yield put(organizerEvents.reset())
  yield put(organizerEvents.set(events.map(({ id }) => ({ id }))))
}

export default function* eventSagas() {
  yield takeLatest('SUBMIT_CREATE_EVENT_FORM', ({ payload }) => createEvent(payload))
  yield takeLatest('SUBMIT_UPDATE_EVENT_FORM', ({ payload }) => updateEvent('event-edit', payload))
  yield takeLatest('SUBMIT_UPDATE_CFP_FORM', ({ payload }) => updateEvent('cfp-edit', payload))
  yield takeEvery('FETCH_EVENT', ({ payload }) => fetchEvent(payload))
  yield takeLatest('FETCH_EVENT_FROM_ROUTER_PARAMS', fetchEventFromRouterParams)
  yield takeLatest('FETCH_ORGANIZER_EVENTS', fetchOrganizerEvents)
}
