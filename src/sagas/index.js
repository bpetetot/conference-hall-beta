import { all } from 'redux-saga/effects'

import firebaseSaga from './firebase'
import authSaga from './auth'
import eventsSaga from './events'
import toasterSaga from './toaster'
import userSaga from './user'
import talksSaga from './talks'
import speakerSaga from './speaker'
import submissionSaga from './submission'
import proposalsSaga from './proposals'
import ratingsSaga from './ratings'

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
      proposalsSaga(),
      ratingsSaga(),
    ])
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('saga exception', error)
  }
}
