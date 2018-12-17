import functions from 'firebase/functionCalls'

export const openSelectSubmission = (action, store, { router }) => {
  const { eventId } = action.payload
  store.ui.speaker.submission.reset()
  router.push('speaker-event-submission', { eventId })
}

export const openEventSubmission = (action, store, { router }) => {
  const { talkId, eventId } = action.payload
  store.ui.speaker.submission.set({ talkId, currentStep: 1 })
  router.push('speaker-event-submission', { eventId })
}

export const submitTalkToEvent = async (action, store, { form }) => {
  const { talkId, eventId } = action.payload
  const submitForm = form('submit-talk')
  const data = submitForm.getFormValues()
  const talk = store.data.talks.get(talkId)

  // submit or update submission with cloud function
  try {
    await submitForm.asyncSubmit(functions.submitTalk, {
      eventId,
      talk: { ...data, ...talk },
    })

    const { currentStep } = store.ui.speaker.submission.get()
    store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
  } catch (e) {
    submitForm.setSubmitFailed()
    console.error(e.message) // eslint-disable-line no-console
  }
}

export const removeTalkFromEvent = async (action, store, { form }) => {
  const { talkId, eventId } = action.payload
  const submitForm = form('submit-talk')
  const talk = store.data.talks.get(talkId)

  // unsubmit the talk with cloud function
  try {
    const updatedTalk = await submitForm.asyncSubmit(functions.unsubmitTalk, {
      eventId,
      talk,
    })
    store.data.talks.update(updatedTalk)
    store.ui.speaker.submission.reset()
  } catch (e) {
    submitForm.setSubmitFailed()
    console.error(e.message) // eslint-disable-line no-console
  }
}
