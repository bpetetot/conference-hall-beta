import { call, put, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import { push } from 'redux-little-router'

import store from 'store'
import { isSubmitted } from 'store/reducers/data/talks.selector'
import { saveTalkSubmission, unsubmitTalk } from 'firebase/submission'

function* onOpenSelectionPage({ eventId }) {
  yield put({ type: '@@ui/ON_CHANGE_SPEAKER_APP_EVENT', payload: { eventId } })
  store.ui.speaker.submission.reset()
  yield put(push(`/speaker/event/${eventId}/submission`))
}

function* onOpenSubmitPage({ eventId, talkId }) {
  yield put({ type: '@@ui/ON_CHANGE_SPEAKER_APP_EVENT', payload: { eventId } })
  store.ui.speaker.submission.set({ talkId, currentStep: 1 })
  yield put(push(`/speaker/event/${eventId}/submission`))
}

function* submitTalkToEvent({ talkId, eventId, data }) {
  const FORM = 'submit-talk'
  const talk = store.data.talks.get(talkId)
  try {
    // indicate start submitting form
    yield put(startSubmit(FORM))
    // check if it's already submitted
    const alreadySubmitted = isSubmitted(talkId, eventId)(store)
    // submit talk
    yield call(saveTalkSubmission, talk, eventId, data, alreadySubmitted)
    // set form submitted
    yield put(stopSubmit(FORM))
    const { currentStep } = store.ui.speaker.submission.get()
    store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
  } catch (error) {
    yield put(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
}

function* unsubmitTalkFromEvent({ talkId, eventId }) {
  const alreadySubmitted = isSubmitted(talkId, eventId)(store)
  if (alreadySubmitted) {
    const talk = store.data.talks.get(talkId)
    const updatedTalk = yield call(unsubmitTalk, talk, eventId)
    store.data.talks.update(updatedTalk)
    store.ui.speaker.submission.reset()
  }
}

export default function* submissionSagas() {
  yield takeLatest('OPEN_SUBMISSION_SELECTION_PAGE', ({ payload }) => onOpenSelectionPage(payload))
  yield takeLatest('OPEN_SUBMISSION_EVENTINFO_PAGE', ({ payload }) => onOpenSubmitPage(payload))
  yield takeLatest('SUBMIT_TALK_TO_EVENT', ({ payload }) => submitTalkToEvent(payload))
  yield takeLatest('UNSUBMIT_TALK_FROM_EVENT', ({ payload }) => unsubmitTalkFromEvent(payload))
}
