export const submitTalkToEvent = async (action, store) => {
  // const { talkId, eventId, data } = action.payload
  // const talk = store.data.talks.get(talkId)

  // submit or update submission with cloud function
  store.ui.loaders.update({ isTalkSubmitting: true })
  try {
    // await functions.submitTalk({
    //   eventId,
    //   talk: { ...data, ...talk },
    // })

    const { currentStep } = store.ui.speaker.submission.get()
    store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
    store.ui.loaders.update({ isTalkSubmitting: false })
  } catch (e) {
    store.ui.loaders.update({ isTalkSubmitting: false })
    store.ui.speaker.submission.update({ error: e.message })
    console.error(e.message) // eslint-disable-line no-console
  }
}

export const unsubmitTalkFromEvent = async (action, store) => {
  // const { talkId, eventId } = action.payload
  // const talk = store.data.talks.get(talkId)

  // unsubmit the talk with cloud function
  store.ui.loaders.update({ isTalkUnsubmitting: true })
  try {
    // const updatedTalk = await functions.unsubmitTalk({
    //   eventId,
    //   talk,
    // })
    // store.data.talks.update(updatedTalk)
    store.ui.speaker.submission.reset()
    store.ui.loaders.update({ isTalkUnsubmitting: false })
  } catch (e) {
    store.ui.loaders.update({ isTalkUnsubmitting: false })
    console.error(e.message) // eslint-disable-line no-console
  }
}
