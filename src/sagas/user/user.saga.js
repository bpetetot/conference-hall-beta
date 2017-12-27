import { takeLatest, call, put } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import userData from 'redux/data/user'
import userCrud from 'sagas/user/user.firebase'

function* saveProfile(profile) {
  try {
    // indicate start submitting form
    yield put(startSubmit('user-profile'))
    // update user data in database
    yield call(userCrud.update, profile)
    // update user data in the store
    yield put(userData.update(profile))
    // set form submitted
    yield put(stopSubmit('user-profile'))
  } catch (error) {
    yield put(stopSubmit('user-profile', { _error: error.message }))
    throw error
  }
}

export default function* eventSagas() {
  yield takeLatest('SUBMIT_PROFILE_FORM', ({ payload }) => saveProfile(payload))
}
