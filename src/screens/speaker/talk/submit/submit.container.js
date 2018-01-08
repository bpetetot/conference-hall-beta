import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import eventsData from 'redux/data/events'
import { getTalkFromRouterParam } from 'redux/data/talks'
import speakerApp from 'redux/ui/speaker/app'
import LoadingIndicator from 'components/loading'
import SubmitTalk from './submit'

const mapState = (state) => {
  const { currentEventId } = speakerApp.get()(state)
  const event = eventsData.get(currentEventId)(state)
  const talk = getTalkFromRouterParam(state)
  return { loaded: !!talk && !!event, event, talk }
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
)(SubmitTalk)
