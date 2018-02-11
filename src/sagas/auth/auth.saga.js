import firebase from 'firebase/app'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { push, replace } from 'redux-little-router'

import store from 'redux/store'
import userCrud from 'sagas/user/user.firebase'

function* signin() {
  const provider = yield new firebase.auth.GoogleAuthProvider()
  yield call(() => firebase.auth().signInWithPopup(provider))
}

function* signout() {
  yield call(() => firebase.auth().signOut())
  yield put(push('/'))
}

function* signedIn({
  uid, displayName = '', photoURL = '', email = '',
}) {
  const userInfo = { displayName, photoURL, email }

  // set auth initialized and authenticated
  yield put({ type: 'FIREBASE/INITIALIZED' })
  yield put({ type: 'FIREBASE/AUTHENTICATED', payload: true })
  yield put({ type: 'FIREBASE/SET_AUTH_UID', payload: uid })

  // check if user exists in database
  let user
  const ref = yield call(userCrud.read, uid)
  if (ref.exists) {
    user = { uid, ...ref.data(), ...userInfo }
  } else {
    // first connexion, add user in database
    user = { uid, ...userInfo }
    yield call(userCrud.create, user)
  }
  // add user in store
  store.data.users.add(user)

  // go to the next url if exists
  const { next } = yield select(state => state.router.query)
  if (next) {
    yield put(replace(next))
  }
}

function* signedOut() {
  yield put({ type: 'FIREBASE/INITIALIZED' })
  yield put({ type: 'FIREBASE/AUTHENTICATED', payload: false })
  store.data.users.reset()
}

export default function* authSaga() {
  yield takeLatest('AUTH/SIGN_OUT', signout)
  yield takeLatest('AUTH/SIGNED_OUT', signedOut)
  yield takeLatest('AUTH/SIGN_IN', ({ payload }) => signin(payload))
  yield takeLatest('AUTH/SIGNED_IN', ({ payload }) => signedIn(payload))
}
