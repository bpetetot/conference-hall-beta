import { reaction } from 'k-ramel'

import { isSubmitted } from 'store/reducers/data/talks.selector'
import { saveTalkSubmission, unsubmitTalk } from 'firebase/submission'

export const openSelectSubmission = reaction((action, store, { router }) => {
  const { eventId } = action.payload
  store.ui.speaker.submission.reset()
  router.push(`/speaker/event/${eventId}/submission`)
})

export const openEventSubmission = reaction((action, store, { router }) => {
  const { talkId, eventId } = action.payload
  store.ui.speaker.submission.set({ talkId, currentStep: 1 })
  router.push(`/speaker/event/${eventId}/submission`)
})

export const submitTalkToEvent = reaction((action, store, { form }) => {
  const { talkId, eventId } = action.payload
  const submitForm = form('submit-talk')
  const data = submitForm.getFormValues()
  // get talk
  const talk = store.data.talks.get(talkId)
  // check if already submitted
  const alreadySubmitted = isSubmitted(talkId, eventId)(store)
  // submit or update submission
  submitForm.asyncSubmit(saveTalkSubmission, talk, eventId, data, alreadySubmitted)
  // go to next step
  const { currentStep } = store.ui.speaker.submission.get()
  store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
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
