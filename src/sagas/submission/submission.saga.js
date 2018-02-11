import { call, put, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import { push } from 'redux-little-router'

import talksData, { isSubmitted } from 'redux/data/talks'
import { saveTalkSubmission, unsubmitTalk } from './submission.firebase'

function* onOpenSelectionPage({ eventId }) {
  yield put({ type: 'SPEAKER/SET_EVENT', payload: { eventId } })
  yield put({ type: 'SUBMISSION_RESET' })
  yield put(push(`/speaker/event/${eventId}/submission`))
}

function* onOpenSubmitPage({ eventId, talkId }) {
  yield put({ type: 'SPEAKER/SET_EVENT', payload: { eventId } })
  yield put({ type: 'SUBMISSION_RESET' })
  yield put({ type: 'SUBMISSION_SELECT_TALK', payload: { talkId } })
  yield put(push(`/speaker/event/${eventId}/submission`))
}

function* submitTalkToEvent({ talkId, eventId, data }) {
  const FORM = 'submit-talk'
  const talk = talksData.get(talkId)
  try {
    // indicate start submitting form
    yield put(startSubmit(FORM))
    // check if it's already submitted
    const alreadySubmitted = yield select(isSubmitted(talkId, eventId))
    // submit talk
    yield call(saveTalkSubmission, talk, eventId, data, alreadySubmitted)
    // set form submitted
    yield put(stopSubmit(FORM))
    yield put({ type: 'SUBMISSION_NEXT_STEP' })
  } catch (error) {
    yield put(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
}

function* unsubmitTalkFromEvent({ talkId, eventId }) {
  const alreadySubmitted = yield select(isSubmitted(talkId, eventId))
  if (alreadySubmitted) {
    const talk = talksData.get(talkId)
    const updatedTalk = yield call(unsubmitTalk, talk, eventId)
    talksData.update(updatedTalk)
    yield put({ type: 'SUBMISSION_RESET' })
  }
}

export default function* submissionSagas() {
  yield takeLatest('OPEN_SUBMISSION_SELECTION_PAGE', ({ payload }) => onOpenSelectionPage(payload))
  yield takeLatest('OPEN_SUBMISSION_EVENTINFO_PAGE', ({ payload }) => onOpenSubmitPage(payload))
  yield takeLatest('SUBMIT_TALK_TO_EVENT', ({ payload }) => submitTalkToEvent(payload))
  yield takeLatest('UNSUBMIT_TALK_FROM_EVENT', ({ payload }) => unsubmitTalkFromEvent(payload))
}
