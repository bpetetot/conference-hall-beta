import { all } from 'redux-saga/effects'

import submissionSaga from './submission.saga'
import proposalsSaga from './proposals.saga'
import ratingsSaga from './ratings.saga'

export default function* sagas() {
  try {
    yield all([submissionSaga(), proposalsSaga(), ratingsSaga()])
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('saga exception', error)
  }
}
