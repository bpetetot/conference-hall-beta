import { connect } from 'react-redux'

import { isCfpOpened } from 'redux/data/events'
import SubmitTalkLink from './submitTalkLink'

const mapState = (state, { eventId }) => {
  const cfpOpened = isCfpOpened(eventId)(state)
  return { eventId, displayed: eventId && cfpOpened }
}

const mapDispatch = (dispatch, { eventId }) => ({
  onClick: () => dispatch({ type: 'OPEN_SUBMISSION_PAGE', payload: { eventId } }),
})

export default connect(mapState, mapDispatch)(SubmitTalkLink)
