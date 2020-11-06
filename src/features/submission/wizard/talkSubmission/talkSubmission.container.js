import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import TalkSubmission from './talkSubmission'

const mapStore = (store) => {
  const { talkId } = store.ui.speaker.submission.get()

  return {
    talkId,
    onSubmit: () => {
      const { currentStep } = store.ui.speaker.submission.get()
      store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
    },
    onUnsubmit: () => {
      store.ui.speaker.submission.reset()
    },
  }
}

export default compose(inject(mapStore))(TalkSubmission)
