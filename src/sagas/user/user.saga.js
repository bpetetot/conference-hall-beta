import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import usersData from 'redux/data/users'
import userCrud from 'sagas/user/user.firebase'

function* fetchUser(uid) {
  // check if user exists in the store
  const userExists = yield select(usersData.get(uid))
  if (userExists) return
  // fetch user in database
  const ref = yield call(userCrud.read, uid)
  // add it in the store
  if (ref.exists) {
    yield put(usersData.add(ref.data()))
  }
}

function* saveProfile(profile) {
  try {
    // indicate start submitting form
    yield put(startSubmit('user-profile'))
    // update user data in database
    yield call(userCrud.update, profile)
    // update user data in the store
    yield put(usersData.update(profile))
    // set form submitted
    yield put(stopSubmit('user-profile'))
  } catch (error) {
    yield put(stopSubmit('user-profile', { _error: error.message }))
    throw error
  }
}

export default function* eventSagas() {
  yield takeEvery('FETCH_USER', ({ payload }) => fetchUser(payload))
  yield takeLatest('SUBMIT_PROFILE_FORM', ({ payload }) => saveProfile(payload))
}
