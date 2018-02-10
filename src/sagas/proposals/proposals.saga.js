import { call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'redux-little-router'

import proposalsData from 'redux/data/proposals'
import proposalsFilters from 'redux/ui/organizer/proposals/filters'
import { getCurrentProposalIndex } from 'redux/ui/organizer/proposal'
import { getUserId } from 'redux/auth'
import { getRouterParam } from 'redux/router'
import { fetchProposal, fetchEventProposals } from './proposals.firebase'

function* loadEventProposals() {
  // get needed inputs
  const eventId = yield select(getRouterParam('eventId'))
  const uid = yield select(getUserId)
  // reset current proposals
  yield put(proposalsData.reset())
  // get event
  yield put({ type: 'FETCH_EVENT', payload: { eventId } })
  // get proposal filters
  const filters = yield select(proposalsFilters.get())
  // fetch proposals
  const proposals = yield call(fetchEventProposals, eventId, uid, filters)
  // set proposals in the store
  yield put(proposalsData.set(proposals))
}

function* onLoadEventProposalsPage() {
  const isInitialized = yield select(proposalsData.isInitialized)
  if (!isInitialized) {
    yield loadEventProposals()
  }
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
  const inStore = yield select(proposalsData.get(proposalId))
  if (!inStore) {
    // fetch proposal from id
    const ref = yield call(fetchProposal, eventId, proposalId)
    if (ref.exists) {
      yield put(proposalsData.add(ref.data()))
    } else {
      yield put({ type: 'PROPOSAL_NOT_FOUND', payload: { proposalId } })
    }
  }
  // get associated ratings
  yield put({ type: 'FETCH_PROPOSAL_RATINGS', payload: { eventId, proposalId } })
}

function* onSelectProposal({ eventId, proposalId }) {
  const proposalKeys = yield select(proposalsData.getKeys)
  const proposalIndex = proposalKeys.indexOf(proposalId)
  if (proposalIndex !== -1) {
    yield put({ type: 'SET_CURRENT_PROPOSAL_INDEX', payload: { proposalIndex } })
    yield put(push(`/organizer/event/${eventId}/proposal/${proposalId}`))
  }
}

function* onNextProposal() {
  const eventId = yield select(getRouterParam('eventId'))
  const proposalIndex = yield select(getCurrentProposalIndex)
  const proposalKeys = yield select(proposalsData.getKeys)
  const nextIndex = proposalIndex + 1
  if (nextIndex < proposalKeys.length) {
    const proposalId = proposalKeys[nextIndex]
    yield put({ type: 'SET_CURRENT_PROPOSAL_INDEX', payload: { proposalIndex: nextIndex } })
    yield put({ type: 'FETCH_PROPOSAL_RATINGS', payload: { eventId, proposalId } })
    yield put(push(`/organizer/event/${eventId}/proposal/${proposalId}`))
  }
}

function* onPreviousProposal() {
  const eventId = yield select(getRouterParam('eventId'))
  const proposalIndex = yield select(getCurrentProposalIndex)
  const proposalKeys = yield select(proposalsData.getKeys)
  const prevIndex = proposalIndex - 1
  if (prevIndex >= 0) {
    const proposalId = proposalKeys[prevIndex]
    yield put({ type: 'SET_CURRENT_PROPOSAL_INDEX', payload: { proposalIndex: prevIndex } })
    yield put({ type: 'FETCH_PROPOSAL_RATINGS', payload: { eventId, proposalId } })
    yield put(push(`/organizer/event/${eventId}/proposal/${proposalId}`))
  }
}

export default function* eventSagas() {
  yield takeLatest('LOAD_EVENT_PROPOSALS_PAGE', onLoadEventProposalsPage)
  yield takeLatest('@@krf/UPDATE>PROPOSALS>FILTERS', loadEventProposals)
  yield takeLatest('LOAD_PROPOSAL_PAGE', onLoadProposalPage)
  yield takeLatest('FETCH_PROPOSAL', ({ payload }) => getProposal(payload))
  yield takeLatest('SELECT_PROPOSAL', ({ payload }) => onSelectProposal(payload))
  yield takeLatest('NEXT_PROPOSAL', onNextProposal)
  yield takeLatest('PREVIOUS_PROPOSAL', onPreviousProposal)
}
