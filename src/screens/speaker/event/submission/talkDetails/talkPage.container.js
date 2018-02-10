import { compose } from 'redux'
import { connect } from 'react-redux'

import { getSubmission } from 'redux/ui/speaker/submission'
import talksData from 'redux/data/talks'
import eventsData from 'redux/data/events'
import TalkPage from './talkPage'

const mapState = (state, { eventId }) => {
  const { talkId } = getSubmission(state)
  const event = eventsData.get(eventId)(state)
  const talk = talksData.get(talkId)(state)
  if (talk.submissions && talk.submissions[event.id]) {
    return { id: talkId, ...talk.submissions[event.id] }
  }
  return { id: talkId, ...talk }
}

const mapDispatch = dispatch => ({
  onNext: () => dispatch({ type: 'SUBMISSION_NEXT_STEP' }),
})

export default compose(connect(mapState, mapDispatch))(TalkPage)
