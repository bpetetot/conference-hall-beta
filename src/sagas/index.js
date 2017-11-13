import { all } from 'redux-saga/effects'

import firebaseSaga from './firebase'
import authSaga from './auth'
import eventSaga from './event'

export default function* sagas() {
  yield all([firebaseSaga(), authSaga(), eventSaga()])
}
