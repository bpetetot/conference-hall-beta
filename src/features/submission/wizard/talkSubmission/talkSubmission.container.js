import { inject } from '@k-ramel/react'

import TalkSubmission from './talkSubmission'

const mapStore = (store) => {
  const { talkId } = store.ui.speaker.submission.get()
  return {
    talkId,
    onNext: () => {
      const { currentStep } = store.ui.speaker.submission.get()
      store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
    },
    onReset: () => {
      store.ui.speaker.submission.update({ currentStep: 0, talkId: undefined })
    },
  }
}

export default inject(mapStore)(TalkSubmission)
