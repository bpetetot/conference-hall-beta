import { compose } from 'redux'
import { connect } from 'react-redux'

import { getSubmission } from 'redux/ui/speaker/submission'
import talksData, { isSubmitted } from 'redux/data/talks'
import eventsData from 'redux/data/events'
import TalkSubmission from './talkSubmission'

const mapState = (state, { eventId }) => {
  const { talkId } = getSubmission(state)
  const event = eventsData.get(eventId)(state)
  const talk = talksData.get(talkId)(state)
  const update = isSubmitted(talkId, eventId)(state)
  const initialValues = talk && talk.submissions ? talk.submissions[event.id] : {}
  return {
    event,
    talk,
    update,
    initialValues,
  }
}

const mapDispatch = dispatch => ({
  onSubmit: (data, _, { talk, event }) => {
    dispatch({
      type: 'SUBMIT_TALK_TO_EVENT',
      payload: { data, talkId: talk.id, eventId: event.id },
    })
  },
  unsubmitTalk: (talkId, eventId) => {
    dispatch({ type: 'UNSUBMIT_TALK_FROM_EVENT', payload: { talkId, eventId } })
  },
})

export default compose(connect(mapState, mapDispatch))(TalkSubmission)
