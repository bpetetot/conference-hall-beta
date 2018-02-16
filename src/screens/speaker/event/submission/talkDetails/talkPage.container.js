import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import TalkPage from './talkPage'

const mapStore = (store, { eventId }) => {
  const { talkId } = store.ui.speaker.submission.get()
  const event = store.data.events.get(eventId)
  const talk = store.data.talks.get(talkId)
  if (talk.submissions && talk.submissions[event.id]) {
    return {
      id: talkId,
      ...talk.submissions[event.id],
      onNext: () => {
        const { currentStep } = store.ui.speaker.submission.get()
        store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
      },
    }
  }
  return {
    id: talkId,
    ...talk,
    onNext: () => {
      const { currentStep } = store.ui.speaker.submission.get()
      store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
    },
  }
}

export default compose(inject(mapStore))(TalkPage)
