import { call, put, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'

import event from 'redux/data/event'
import user from 'redux/data/user'
import { toast } from 'redux/ui/toaster'
import { createEvent, updateEvent, fetchEvent } from './event.firebase'

function* createOrUpdateEvent({ payload }) {
  try {
    // indicate start submitting form
    yield put(startSubmit('event'))

    if (payload.mode === 'create') {
      // get user id
      const { uid } = yield select(user.get())
      // create event into database
      const ref = yield call(createEvent, payload.event, uid)
      // go to event page
      yield put(push(`/organizer/event/${ref.id}`))
      // reset form
      yield put(reset('event'))
    } else {
      // create event into database
      yield call(updateEvent, payload.event)
      // update event in store
      yield put(event.set(payload.event))
      // toast update
      yield put(toast(Date.now(), 'Event updated', 'info'))
    }
    // set form submitted
    yield put(stopSubmit('event'))
  } catch (error) {
    yield put(stopSubmit('event', { _error: error.message }))
    throw error
  }
}

function* getEvent() {
  // get event id from router
  const { id } = yield select(state => state.router.params)

  // check if already in the store
  const current = yield select(event.get())
  if (current && current.id === id) {
    return
  }

  // wipe current event in the store
  yield put(event.reset())

  // fetch event from id
  const ref = yield call(fetchEvent, id)
  if (ref.exists) {
    yield put(event.set({ id, ...ref.data() }))
  } else {
    yield put(toast(id, `Event '${id}' not found, it might be deleted or it's not yours.`, 'warning'))
    yield put(push('/organizer'))
  }
}

export default function* eventSagas() {
  yield takeLatest('SUBMIT_EVENT_FORM', createOrUpdateEvent)
  yield takeLatest('FETCH_EVENT', getEvent)
}
