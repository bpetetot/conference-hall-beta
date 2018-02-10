import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'

import eventsData from 'redux/data/events'
import Submission from './submission'

const mapState = (state, { eventId }) => {
  const { id, name } = eventsData.get(eventId)(state) || {}
  return { id, name }
}

const mapDispatch = (dispatch, { eventId, talkId }) => ({
  load: () => {
    dispatch({ type: 'FETCH_EVENT', payload: { eventId } })
  },
  onClickEdit: () => {
    dispatch({ type: 'OPEN_SUBMISSION_EVENTINFO_PAGE', payload: { eventId, talkId } })
  },
  onClickEvent: () => {
    dispatch({ type: 'SPEAKER/OPEN_EVENT_PAGE', payload: { eventId } })
  },
})

export default compose(
  connect(mapState, mapDispatch), //
  loader(), //
)(Submission)
