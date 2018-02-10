import { compose } from 'redux'
import { inject } from 'k-ramel/react'

import { getSubmission } from 'redux/ui/speaker/submission'
import talksData, { isSubmitted } from 'redux/data/talks'
import eventsData from 'redux/data/events'
import TalkSubmission from './talkSubmission'

const mapStore = (store, { eventId }) => {
  const { talkId } = getSubmission(store.getState())
  const event = eventsData.get(eventId)(store.getState())
  const talk = talksData.get(talkId)(store.getState())
  const update = isSubmitted(talkId, eventId)(store.getState())
  const initialValues = talk && talk.submissions ? talk.submissions[event.id] : {}
  return {
    event,
    talk,
    update,
    initialValues,
    onSubmit: (data) => {
      store.dispatchdispatch({
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
