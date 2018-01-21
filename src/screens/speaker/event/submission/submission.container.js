import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import { getRouterParam } from 'redux/router'
import eventsData from 'redux/data/events'
import { getSubmission } from 'redux/ui/speaker/submission'
import Submission from './submission'

const mapState = (state) => {
  const eventId = getRouterParam('eventId')(state)
  const event = eventsData.get(eventId)(state) || {}
  const { currentStep } = getSubmission(state)
  return {
    loaded: !!event,
    eventId: event.id,
    eventName: event.name,
    currentStep,
  }
}

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'ON_LOAD_EVENT_PAGE' }),
})

export default compose(
  forRoute('SUBMISSION'), //
  connect(mapState, mapDispatch), //
  loader, //
)(Submission)
