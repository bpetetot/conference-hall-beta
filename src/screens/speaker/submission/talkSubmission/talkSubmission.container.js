import { compose } from 'redux'
import { connect } from 'react-redux'

import { getSubmission } from 'redux/ui/speaker/submission'
import talksData from 'redux/data/talks'
import eventsData from 'redux/data/events'
import TalkSubmission from './talkSubmission'

const mapState = (state, { eventId }) => {
  const { talkId } = getSubmission(state)
  const event = eventsData.get(eventId)(state)
  const talk = talksData.get(talkId)(state)
  const initialValues = talk && talk.submissions ? talk.submissions[event.id] : {}
  return { event, talk, initialValues }
}

const mapDispatch = dispatch => ({
  onSubmit: (data, _, { talk, event }) => {
    dispatch({
      type: 'SUBMIT_TALK_TO_EVENT',
      payload: { data, talkId: talk.id, eventId: event.id },
    })
  },
})

export default compose(connect(mapState, mapDispatch))(TalkSubmission)
