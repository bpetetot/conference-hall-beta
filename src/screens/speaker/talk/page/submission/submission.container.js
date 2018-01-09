import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'

import eventsData from 'redux/data/events'
import Submission from './submission'

const mapState = (state, { eventId }) => {
  const event = eventsData.get(eventId)(state)
  return { name: event ? event.name : undefined }
}

const mapDispatch = (dispatch, { eventId, talkId }) => ({
  load: () => dispatch({ type: 'FETCH_EVENT', payload: eventId }),
  onClick: () => dispatch({ type: 'CLICK_SUBMITTED_EVENT_FOR_TALK', payload: { eventId, talkId } }),
})

export default compose(connect(mapState, mapDispatch), loader())(Submission)
