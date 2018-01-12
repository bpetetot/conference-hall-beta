import { call, put, select, takeLatest } from 'redux-saga/effects'

import proposalsData from 'redux/data/proposals'
import { getEventIdFromRouterParam } from 'redux/data/events'
import { fetchEventProposals } from './proposals.firebase'

function* onLoadEventProposalsPage() {
  // get event id from router
  const eventId = yield select(getEventIdFromRouterParam)
  // get event
  yield put({ type: 'FETCH_EVENT', payload: eventId })
  // fetch proposals
  const proposals = yield call(fetchEventProposals, eventId)
  // set proposals in the store
  yield put(proposalsData.set(proposals))
}

export default function* eventSagas() {
  yield takeLatest('LOAD_EVENT_PROPOSALS_PAGE', onLoadEventProposalsPage)
}
