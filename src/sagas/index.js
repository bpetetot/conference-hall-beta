import { all } from 'redux-saga/effects'

import eventsSaga from './events.saga'
import talksSaga from './talks.saga'
import submissionSaga from './submission.saga'
import proposalsSaga from './proposals.saga'
import ratingsSaga from './ratings.saga'

export default function* sagas() {
  try {
    yield all([eventsSaga(), talksSaga(), submissionSaga(), proposalsSaga(), ratingsSaga()])
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('saga exception', error)
  }
}
