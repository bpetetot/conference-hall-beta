import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import { push } from 'redux-little-router'

import eventsData from 'redux/data/events'
import Submission from './submission'

const mapState = (state, { eventId }) => {
  const { id, name } = eventsData.get(eventId)(state) || {}
  return { id, name }
}

const mapDispatch = (dispatch, { eventId, talkId }) => ({
  load: () => dispatch({ type: 'FETCH_EVENT', payload: eventId }),
  onClickEdit: () => {
    dispatch({ type: 'SET_CURRENT_EVENT', payload: eventId })
    dispatch(push(`/speaker/talk/${talkId}/submit`))
  },
  onClickEvent: () => {
    dispatch({ type: 'SET_CURRENT_EVENT', payload: eventId })
    dispatch(push(`/speaker/event/${eventId}`))
  },
})

export default compose(connect(mapState, mapDispatch), loader())(Submission)
