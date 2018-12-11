import functions from 'firebase/functionCalls'

export const openSelectSubmission = (action, store, { router }) => {
  const { eventId } = action.payload
  store.ui.speaker.submission.reset()
  router.push(`/speaker/event/${eventId}/submission`)
}

export const openEventSubmission = (action, store, { router }) => {
  const { talkId, eventId } = action.payload
  store.ui.speaker.submission.set({ talkId, currentStep: 1 })
  router.push(`/speaker/event/${eventId}/submission`)
}

export const submitTalkToEvent = async (action, store) => {
  const { talkId, eventId, data } = action.payload
  const talk = store.data.talks.get(talkId)

  // submit or update submission with cloud function
  try {
    await functions.submitTalk({
      eventId,
      talk: { ...data, ...talk },
    })

    const { currentStep } = store.ui.speaker.submission.get()
    store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
  } catch (e) {
    console.error(e.message) // eslint-disable-line no-console
  }
}

export const unsubmitTalkFromEvent = async (action, store) => {
  const { talkId, eventId } = action.payload
  const talk = store.data.talks.get(talkId)

  // unsubmit the talk with cloud function
  try {
    const updatedTalk = await functions.unsubmitTalk({
      eventId,
      talk,
    })
    store.data.talks.update(updatedTalk)
    store.ui.speaker.submission.reset()
  } catch (e) {
    console.error(e.message) // eslint-disable-line no-console
  }
}
