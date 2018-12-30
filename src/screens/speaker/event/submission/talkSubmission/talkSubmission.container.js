import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import { isSubmitted } from 'store/reducers/data/talks.selector'
import TalkSubmission from './talkSubmission'

const mapStore = (store, { eventId }) => {
  const { talkId } = store.ui.speaker.submission.get()
  const event = store.data.events.get(eventId)
  const talk = store.data.talks.get(talkId)
  const update = isSubmitted(talkId, eventId)(store)
  const initialValues = talk && talk.submissions ? talk.submissions[event.id] : {}

  return {
    event,
    talk,
    update,
    initialValues,
    isSubmitting: store.ui.loaders.get().isTalkSubmitting,
    isUnsubmitting: store.ui.loaders.get().isTalkUnsubmitting,
    onSubmit: (data) => {
      store.dispatch({ type: '@@ui/ON_SUBMIT_TALK_TO_EVENT', payload: { talkId, eventId, data } })
    },
    unsubmitTalk: () => {
      store.dispatch({ type: '@@ui/ON_UNSUBMIT_TALK_FROM_EVENT', payload: { talkId, eventId } })
    },
  }
}

export default compose(inject(mapStore))(TalkSubmission)
