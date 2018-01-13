import { call, put, select, takeLatest } from 'redux-saga/effects'

import proposalsData from 'redux/data/proposals'
import { getRouterParam } from 'redux/router'
import { fetchEventProposals } from './proposals.firebase'

function* onLoadEventProposalsPage() {
  // get event id from router
  const eventId = yield select(getRouterParam('eventId'))
  // get event
  yield put({ type: 'FETCH_EVENT', payload: { eventId } })
  // fetch proposals
  const proposals = yield call(fetchEventProposals, eventId)
  // set proposals in the store
  yield put(proposalsData.set(proposals))
}

function* onLoadProposalPage() {
  // get event id from router
  const eventId = yield select(getEventIdFromRouterParam)
  // get event
  yield put({ type: 'FETCH_EVENT', payload: eventId })
}

export default function* eventSagas() {
  yield takeLatest('LOAD_EVENT_PROPOSALS_PAGE', onLoadEventProposalsPage)
  yield takeLatest('LOAD_PROPOSAL_PAGE', onLoadProposalPage)
}
