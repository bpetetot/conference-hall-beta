import { call, put, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'

import { toast } from 'redux/ui/toaster'
import userData from 'redux/data/user'
import talkData from 'redux/data/talk'
import talkCrud from 'sagas/talk/talk.firebase'

function* createOrUpdateTalk(form, talk) {
  try {
    // indicate start submitting form
    yield put(startSubmit(form))
    if (form === 'talk-create') {
      // get user id
      const { uid } = yield select(userData.get())
      // create talk into database
      const ref = yield call(talkCrud.create, { ...talk, speakers: { [uid]: true } })
      // go to talk page
      yield put(push(`/speaker/talk/${ref.id}`))
      // reset form
      yield put(reset(form))
    } else {
      // update talk into database
      yield call(talkCrud.update, talk)
    }
    // set form submitted
    yield put(stopSubmit(form))
  } catch (error) {
    yield put(stopSubmit(form, { _error: error.message }))
    throw error
  }
}

function* getTalk() {
  // get talk id from router
  const { id } = yield select(state => state.router.params)
  // check if already in the store
  const current = yield select(talkData.get())
  if (current && current.id === id) return
  // wipe current talk in the store
  yield put(talkData.reset())
  // fetch event from id
  const ref = yield call(talkCrud.read, id)
  if (ref.exists) {
    yield put(talkData.set({ id, ...ref.data() }))
  } else {
    yield put(toast(id, `Talk '${id}' not found, it might be deleted or it's not yours.`, 'warning'))
    yield put(push('/speaker'))
  }
}

export default function* eventSagas() {
  yield takeLatest('SUBMIT_TALK_FORM', ({ payload }) =>
    createOrUpdateTalk(payload.form, payload.talk))
  yield takeLatest('FETCH_TALK', getTalk)
}
