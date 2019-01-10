import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import { isCfpOpened } from 'store/reducers/data/events.selector'
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
    cfpOpened: isCfpOpened(eventId)(store),
    load: () => store.dispatch('@@ui/ON_LOAD_TALK'),
    opUpdateSubmission: () => {
      store.dispatch({ type: '@@ui/GO_TO_EVENT_SUBMISSION', payload: { eventId, talkId, step: 2 } })
    },
  }
}

export default compose(
  forRoute.absolute('speaker-event-submission-page'),
  inject(mapStore),
  loader,
)(SubmissionPage)
