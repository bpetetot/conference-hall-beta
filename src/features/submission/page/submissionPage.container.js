import { inject } from '@k-ramel/react'

import { isCfpOpened } from 'store/reducers/data/events.selector'
import SubmissionPage from './submissionPage'

const mapStore = (store, { eventId, talkId }) => {
  return {
    eventId,
    cfpOpened: isCfpOpened(eventId)(store),
    onUpdateSubmission: () => {
      store.ui.speaker.submission.set({ talkId, currentStep: 2 })
    },
  }
}

export default inject(mapStore)(SubmissionPage)
