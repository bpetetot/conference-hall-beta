import { compose } from 'redux'
import { inject } from 'k-ramel/react'

import { getSubmission } from 'redux/ui/speaker/submission'
import { isSubmitted } from 'redux/data/talks.selector'
import TalkSubmission from './talkSubmission'

const mapStore = (store, { eventId }) => {
  const { talkId } = getSubmission(store.getState())
  const event = store.data.events.get(eventId)
  const talk = store.data.talks.get(talkId)
  const update = isSubmitted(talkId, eventId)(store)
  const initialValues = talk && talk.submissions ? talk.submissions[event.id] : {}
  return {
    event,
    talk,
    update,
    initialValues,
    onSubmit: (data) => {
      store.dispatch({
        type: 'SUBMIT_TALK_TO_EVENT',
        payload: { data, talkId, eventId },
      })
    },
    unsubmitTalk: () => {
      store.dispatch({ type: 'UNSUBMIT_TALK_FROM_EVENT', payload: { talkId, eventId } })
    },
  }
}

export default compose(inject(mapStore))(TalkSubmission)
