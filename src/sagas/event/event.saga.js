import { call, put, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'

import eventData from 'redux/data/event'
import { getUserId } from 'redux/auth'
import eventCrud from 'sagas/event/event.firebase'

function* createOrUpdateEvent(form, event) {
  try {
    // indicate start submitting form
    yield put(startSubmit(form))
    if (form === 'event-create') {
      // get user id
      const uid = yield select(getUserId)
      // create event into database
      const ref = yield call(eventCrud.create, { ...event, owner: uid })
      // go to event page
      yield put(push(`/organizer/event/${ref.id}`))
      // reset form
      yield put(reset(form))
    } else {
      // update event into database
      yield call(eventCrud.update, event)
      // update event in store
      yield put(eventData.update(event))
    }
    // set form submitted
    yield put(stopSubmit(form))
  } catch (error) {
    yield put(stopSubmit(form, { _error: error.message }))
    throw error
  }
}

function* getEvent(id) {
  // check if already in the store
  const current = yield select(eventData.get())
  if (current && current.id === id) return
  // wipe current event in the store
  yield put(eventData.reset())
  // fetch event from id
  const ref = yield call(eventCrud.read, id)
  if (ref.exists) {
    yield put(eventData.set({ id, ...ref.data() }))
  } else {
    yield put({ type: 'EVENT_NOT_FOUND', payload: id })
  }
}

function* getEventFromRouterParams() {
  // get event id from router params
  const { id } = yield select(state => state.router.params)
  if (id) {
    yield getEvent(id)
  }
}

export default function* eventSagas() {
  yield takeLatest('SUBMIT_EVENT_FORM', ({ payload }) =>
    createOrUpdateEvent(payload.form, payload.event))
  yield takeLatest('FETCH_EVENT', ({ payload }) => getEvent(payload))
  yield takeLatest('FETCH_EVENT_FROM_ROUTER_PARAMS', getEventFromRouterParams)
}
