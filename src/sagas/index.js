import { all } from 'redux-saga/effects'

import firebaseSaga from './firebase.saga'
import authSaga from './auth.saga'
import eventsSaga from './events.saga'
import userSaga from './user.saga'
import talksSaga from './talks.saga'
import speakerSaga from './speaker.saga'
import submissionSaga from './submission.saga'
import proposalsSaga from './proposals.saga'
import ratingsSaga from './ratings.saga'

export default function* sagas() {
  try {
    yield all([
      firebaseSaga(),
      authSaga(),
      eventsSaga(),
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
