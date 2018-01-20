import { call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'redux-little-router'

import proposalsData from 'redux/data/proposals'
import { getRatingsAverage } from 'redux/data/ratings'
import { saveRating } from 'sagas/ratings'
import { getCurrentProposalIndex } from 'redux/ui/organizer/proposal'
import { getRouterParam } from 'redux/router'
import { fetchProposal, fetchEventProposals, updateRating } from './proposals.firebase'

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
    yield put({ type: 'SET_CURRENT_PROPOSAL_INDEX', payload: { proposalIndex: nextIndex } })
    yield put(push(`/organizer/event/${eventId}/proposal/${proposalKeys[nextIndex]}`))
  }
}

function* onPreviousProposal() {
  const eventId = yield select(getRouterParam('eventId'))
  const proposalIndex = yield select(getCurrentProposalIndex)
  const proposalKeys = yield select(proposalsData.getKeys)
  const nextIndex = proposalIndex - 1
  if (nextIndex >= 0) {
    yield put({ type: 'SET_CURRENT_PROPOSAL_INDEX', payload: { proposalIndex: nextIndex } })
    yield put(push(`/organizer/event/${eventId}/proposal/${proposalKeys[nextIndex]}`))
  }
}

function* rateProposal({ ratingValue }) {
  // select needed inputs in the state
  const eventId = yield select(getRouterParam('eventId'))
  const proposalId = yield select(getRouterParam('proposalId'))
  // user rating
  const userRating = ratingValue <= 5 ? ratingValue : 5 // rating == 6 means love it
  // compute rate feeling
  let feeling = 'voted'
  if (ratingValue === 0) feeling = 'hate'
  if (ratingValue === 6) feeling = 'love'
  // add the rating
  const rating = { rating: userRating, feeling }
  yield saveRating({ eventId, proposalId, rating })
  // compute average rating
  const avgRating = yield select(getRatingsAverage)
  // save in database
  yield call(updateRating, eventId, proposalId, avgRating)
  // update in the store
  yield put(proposalsData.update({ id: proposalId, rating: avgRating }))
}

export default function* eventSagas() {
  yield takeLatest('LOAD_EVENT_PROPOSALS_PAGE', onLoadEventProposalsPage)
  yield takeLatest('LOAD_PROPOSAL_PAGE', onLoadProposalPage)
  yield takeLatest('FETCH_PROPOSAL', ({ payload }) => getProposal(payload))
  yield takeLatest('SELECT_PROPOSAL', ({ payload }) => onSelectProposal(payload))
  yield takeLatest('NEXT_PROPOSAL', onNextProposal)
  yield takeLatest('PREVIOUS_PROPOSAL', onPreviousProposal)
  yield takeLatest('RATE_PROPOSAL', ({ payload }) => rateProposal(payload))
}
