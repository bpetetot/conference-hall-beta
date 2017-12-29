import { call, put, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'

import userData from 'redux/data/user'
import talkCrud from 'sagas/talk/talk.firebase'

function* createOrUpdateTalk(form, talk) {
  try {
    // indicate start submitting form
    yield put(startSubmit(form))
    if (form === 'talk-create') {
      // get user id
      const { uid } = yield select(userData.get())
      // create talk into database
      yield call(talkCrud.create, { ...talk, owner: uid, speakers: [uid] })
      // go to event page
      yield put(push('/speaker'))
      // reset form
      yield put(reset(form))
    } else {
      // create event into database
      yield call(talkCrud.update, talk)
    }
    // set form submitted
    yield put(stopSubmit(form))
  } catch (error) {
    yield put(stopSubmit(form, { _error: error.message }))
    throw error
  }
}

export default function* eventSagas() {
  yield takeLatest('SUBMIT_TALK_FORM', ({ payload }) =>
    createOrUpdateTalk(payload.form, payload.talk))
}
