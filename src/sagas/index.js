import { all } from 'redux-saga/effects'

import proposalsSaga from './proposals.saga'
import ratingsSaga from './ratings.saga'

export default function* sagas() {
  try {
    yield all([proposalsSaga(), ratingsSaga()])
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('saga exception', error)
  }
}
