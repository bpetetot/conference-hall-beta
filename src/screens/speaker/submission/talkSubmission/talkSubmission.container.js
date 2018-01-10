import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'
import isEmpty from 'lodash/isEmpty'

import { getSpeakerAppEvent } from 'redux/ui/speaker/app'
import { getTalkFromRouterParam } from 'redux/data/talks'
import LoadingIndicator from 'components/loading'
import TalkSubmission from './talkSubmission'

const mapState = (state) => {
  const event = getSpeakerAppEvent(state)
  const talk = getTalkFromRouterParam(state)
  const initialValues = talk && talk.submissions ? talk.submissions[event.id] : {}
  return {
    loaded: !isEmpty(talk) && !isEmpty(event),
    event,
    talk,
    initialValues,
  }
}

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_TALK_FROM_ROUTER_PARAMS' }),
  onSubmit: (data, _, { talk, event }) => {
    dispatch({
      type: 'SUBMIT_TALK_TO_EVENT',
      payload: { data, talkId: talk.id, eventId: event.id },
    })
  },
})

export default compose(
  forRoute('TALK_SUBMIT', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(TalkSubmission)
