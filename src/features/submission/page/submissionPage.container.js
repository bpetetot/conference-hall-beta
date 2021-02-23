import { inject } from '@k-ramel/react'

import SubmissionPage from './submissionPage'

const mapStore = (store, { talkId }) => {
  return {
    onUpdateSubmission: () => {
      store.ui.speaker.submission.set({ talkId, currentStep: 2 })
    },
  }
}

export default inject(mapStore)(SubmissionPage)
