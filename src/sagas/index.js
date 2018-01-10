import { all } from 'redux-saga/effects'

import firebaseSaga from './firebase'
import authSaga from './auth'
import eventsSaga from './events'
import toasterSaga from './toaster'
import userSaga from './user'
import talksSaga from './talks'
import speakerSaga from './speaker'
import submissionSaga from './submission'

export default function* sagas() {
  try {
    yield all([
      firebaseSaga(),
      authSaga(),
      eventsSaga(),
      toasterSaga(),
      userSaga(),
      talksSaga(),
      speakerSaga(),
      submissionSaga(),
    ])
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('saga exception', error)
  }
}
