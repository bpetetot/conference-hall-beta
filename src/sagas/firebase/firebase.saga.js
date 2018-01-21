import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { eventChannel } from 'redux-saga'
import { call, put, takeLatest, take } from 'redux-saga/effects'
import { toast } from 'redux/ui/toaster'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
}

function* initializeAuth() {
  firebase.auth().useDeviceLanguage()

  const channel = eventChannel((emitter) => {
    firebase.auth().onAuthStateChanged(user => emitter({ user }))
    return () => emitter('finished')
  })
  while (true) {
    const { user } = yield take(channel)
    if (!user) {
      yield put({ type: 'AUTH/SIGNED_OUT' })
    } else {
      yield put({ type: 'AUTH/SIGNED_IN', payload: user })
    }
  }
}

function* initialize() {
  yield call(firebase.initializeApp, config)

  try {
    yield call(() => firebase.firestore().enablePersistence())
  } catch (error) {
    yield put(toast(error.code, error.message, 'warning'))
  }
  yield call(() => firebase.firestore())

  yield* initializeAuth()
}

export default function* firebaseSaga() {
  yield takeLatest('FIREBASE/INITIALIZE', initialize)
}
