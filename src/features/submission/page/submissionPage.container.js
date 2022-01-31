import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import { isCfpOpen } from 'store/reducers/data/events.selector'
import loader from 'components/loader'
import SubmissionPage from './submissionPage'

const mapStore = (store, { eventId, talkId }) => {
  const talk = store.data.talks.get(talkId) || {}
  const submission = talk.submissions && talk.submissions[eventId]

  return {
    loaded: !!talk.id,
    eventId,
    ...submission,
    cfpOpen: isCfpOpen(eventId)(store),
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_TALK', payload: { talkId } }),
    onUpdateSubmission: () => {
      store.ui.speaker.submission.set({ talkId, currentStep: 2 })
    },
  }
}

export default compose(inject(mapStore), loader)(SubmissionPage)
