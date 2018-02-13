import { reaction } from 'k-ramel'
import { startSubmit, stopSubmit } from 'redux-form'
import { push } from 'redux-little-router'

import { isSubmitted } from 'store/reducers/data/talks.selector'
import { saveTalkSubmission, unsubmitTalk } from 'firebase/submission'

export const openSelectSubmission = reaction((action, store) => {
  const { eventId } = action.payload
  store.ui.speaker.submission.reset()
  store.dispatch(push(`/speaker/event/${eventId}/submission`))
})

export const openEventSubmission = reaction((action, store) => {
  const { talkId, eventId } = action.payload
  store.ui.speaker.submission.set({ talkId, currentStep: 1 })
  store.dispatch(push(`/speaker/event/${eventId}/submission`))
})

export const submitTalkToEvent = reaction(async (action, store) => {
  const { talkId, eventId, data } = action.payload
  const FORM = 'submit-talk'
  const talk = store.data.talks.get(talkId)
  try {
    // indicate start submitting form
    store.dispatch(startSubmit(FORM))
    // check if it's already submitted
    const alreadySubmitted = isSubmitted(talkId, eventId)(store)
    // submit talk
    await saveTalkSubmission(talk, eventId, data, alreadySubmitted)
    // set form submitted
    store.dispatch(stopSubmit(FORM))
    const { currentStep } = store.ui.speaker.submission.get()
    store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
  } catch (error) {
    store.dispatch(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
})

export const removeTalkFromEvent = reaction(async (action, store) => {
  const { talkId, eventId } = action.payload
  const alreadySubmitted = isSubmitted(talkId, eventId)(store)
  if (alreadySubmitted) {
    const talk = store.data.talks.get(talkId)
    const updatedTalk = await unsubmitTalk(talk, eventId)
    store.data.talks.update(updatedTalk)
    store.ui.speaker.submission.reset()
  }
})
