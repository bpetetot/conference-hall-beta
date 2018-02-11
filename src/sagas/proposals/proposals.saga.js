import { call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'redux-little-router'

import store from 'redux/store'
import { getCurrentProposalIndex } from 'redux/ui/organizer/proposal'
import { getRouterParam } from 'redux/router'
import { fetchProposal, fetchEventProposals } from './proposals.firebase'

function* loadEventProposals() {
  // get needed inputs
  const eventId = yield select(getRouterParam('eventId'))
  const { uid } = store.auth.get()
  // reset current proposals
  store.data.proposals.reset()
  // get event
  yield put({ type: 'FETCH_EVENT', payload: { eventId } })
  // get proposal filters
  const filters = store.ui.organizer.proposals.filters.get()
  // fetch proposals
  const proposals = yield call(fetchEventProposals, eventId, uid, filters)
  // set proposals in the store
  store.data.proposals.set(proposals)
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
  const inStore = store.data.proposals.get(proposalId)
  if (!inStore) {
    // fetch proposal from id
    const ref = yield call(fetchProposal, eventId, proposalId)
    if (ref.exists) {
      store.data.proposals.add(ref.data())
    } else {
      yield put({ type: 'PROPOSAL_NOT_FOUND', payload: { proposalId } })
    }
  }
  // get associated ratings
  yield put({ type: 'FETCH_PROPOSAL_RATINGS', payload: { eventId, proposalId } })
}

function* onSelectProposal({ eventId, proposalId }) {
  const proposalKeys = store.data.proposals.getKeys()
  const proposalIndex = proposalKeys.indexOf(proposalId)
  if (proposalIndex !== -1) {
    yield put({ type: 'SET_CURRENT_PROPOSAL_INDEX', payload: { proposalIndex } })
    yield put(push(`/organizer/event/${eventId}/proposal/${proposalId}`))
  }
}

function* onNextProposal() {
  const eventId = yield select(getRouterParam('eventId'))
  const proposalIndex = yield select(getCurrentProposalIndex)
  const proposalKeys = store.data.proposals.getKeys()
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
  const proposalKeys = store.data.proposals.getKeys()
  const prevIndex = proposalIndex - 1
  if (prevIndex >= 0) {
    const proposalId = proposalKeys[prevIndex]
    yield put({ type: 'SET_CURRENT_PROPOSAL_INDEX', payload: { proposalIndex: prevIndex } })
    yield put({ type: 'FETCH_PROPOSAL_RATINGS', payload: { eventId, proposalId } })
    yield put(push(`/organizer/event/${eventId}/proposal/${proposalId}`))
  }
}

export default function* eventSagas() {
  yield takeLatest('LOAD_EVENT_PROPOSALS_PAGE', loadEventProposals)
  yield takeLatest('@@krf/UPDATE>PROPOSALS>FILTERS', loadEventProposals)
  yield takeLatest('LOAD_PROPOSAL_PAGE', onLoadProposalPage)
  yield takeLatest('FETCH_PROPOSAL', ({ payload }) => getProposal(payload))
  yield takeLatest('SELECT_PROPOSAL', ({ payload }) => onSelectProposal(payload))
  yield takeLatest('NEXT_PROPOSAL', onNextProposal)
  yield takeLatest('PREVIOUS_PROPOSAL', onPreviousProposal)
}
