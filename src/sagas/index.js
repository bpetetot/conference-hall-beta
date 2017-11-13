import { all } from 'redux-saga/effects'

import firebaseSaga from './firebase'
import authSaga from './auth'
import eventSaga from './event'
import toasterSaga from './toaster'

export default function* sagas() {
  try {
    yield all([firebaseSaga(), authSaga(), eventSaga(), toasterSaga()])
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('saga exception', error)
  }
}
