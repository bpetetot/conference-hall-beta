import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import TalkPage from './talkPage'

const mapStore = (store) => {
  const { talkId } = store.ui.speaker.submission.get()
  return {
    talkId,
    onNext: () => {
      const { currentStep } = store.ui.speaker.submission.get()
      store.ui.speaker.submission.update({ currentStep: currentStep + 1 })
    },
  }
}

export default compose(inject(mapStore))(TalkPage)
