import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import SubmissionPage from './submissionPage'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const talkId = router.getParam('talkId')
  const talk = store.data.talks.get(talkId) || {}
  const submission = talk.submissions && talk.submissions[eventId]
  return {
    loaded: !!talk.id,
    eventId,
    ...submission,
    load: () => store.dispatch('@@ui/ON_LOAD_TALK'),
  }
}

export default compose(
  forRoute.absolute('speaker-event-submission-page'),
  inject(mapStore),
  loader,
)(SubmissionPage)
