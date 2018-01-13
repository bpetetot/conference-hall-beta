import { call, put, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import { push } from 'redux-little-router'

import { saveTalkSubmission } from './submission.firebase'

function* openSubmissionPage({ eventId }) {
  yield put({ type: 'SET_CURRENT_EVENT', payload: eventId })
  yield put({ type: 'SUBMISSION_RESET' })
  yield put(push('/speaker/submission'))
}

function* openSubmissionUpdatePage({ eventId, talkId }) {
  yield put({ type: 'SET_CURRENT_EVENT', payload: eventId })
  yield put({ type: 'SUBMISSION_RESET' })
  yield put({ type: 'SUBMISSION_SELECT_UPDATE_TALK', payload: { talkId } })
  yield put(push('/speaker/submission'))
}

function* submitTalkToEvent({ talkId, eventId, data }) {
  const FORM = 'submit-talk'
  try {
    // indicate start submitting form
    yield put(startSubmit(FORM))
    // submit talk
    yield call(saveTalkSubmission, talkId, eventId, data)
    // set form submitted
    yield put(stopSubmit(FORM))
    yield put({ type: 'SUBMISSION_NEXT_STEP' })
  } catch (error) {
    yield put(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
}

export default function* submissionSagas() {
  yield takeLatest('OPEN_SUBMISSION_PAGE', ({ payload }) => openSubmissionPage(payload))
  yield takeLatest('OPEN_SUBMISSION_UPDATE_PAGE', ({ payload }) =>
    openSubmissionUpdatePage(payload))
  yield takeLatest('SUBMIT_TALK_TO_EVENT', ({ payload }) => submitTalkToEvent(payload))
}
