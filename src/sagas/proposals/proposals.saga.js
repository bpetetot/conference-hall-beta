import { call, put, select, takeLatest } from 'redux-saga/effects'

import proposalsData from 'redux/data/proposals'
import { getRouterParam } from 'redux/router'
import { fetchProposal, fetchEventProposals } from './proposals.firebase'

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
  const eventId = yield select(getRouterParam('eventId'))
  // get event
  yield put({ type: 'FETCH_EVENT', payload: { eventId } })
  // get proposal id from router
  const proposalId = yield select(getRouterParam('proposalId'))
  // get proposal
  yield put({ type: 'FETCH_PROPOSAL', payload: { eventId, proposalId } })
}

function* getProposal({ eventId, proposalId }) {
  // check if already in the store
  const current = yield select(proposalsData.get(proposalId))
  if (current && current.id === proposalId) return
  // fetch proposal from id
  const ref = yield call(fetchProposal, eventId, proposalId)
  if (ref.exists) {
    yield put(proposalsData.add(ref.data()))
  } else {
    yield put({ type: 'PROPOSAL_NOT_FOUND', payload: { proposalId } })
  }
}

export default function* eventSagas() {
  yield takeLatest('LOAD_EVENT_PROPOSALS_PAGE', onLoadEventProposalsPage)
  yield takeLatest('LOAD_PROPOSAL_PAGE', onLoadProposalPage)
  yield takeLatest('FETCH_PROPOSAL', ({ payload }) => getProposal(payload))
}
