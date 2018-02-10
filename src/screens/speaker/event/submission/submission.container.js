import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import { getRouterParam } from 'redux/router'
import eventsData from 'redux/data/events'
import { getSubmission } from 'redux/ui/speaker/submission'
import Submission from './submission'

const mapStore = (store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const event = eventsData.get(eventId)(store.getState()) || {}
  const { currentStep } = getSubmission(store.getState())
  return {
    loaded: !!event,
    eventId: event.id,
    eventName: event.name,
    currentStep,
    load: () => store.dispatch({ type: 'ON_LOAD_EVENT_PAGE' }),
  }
}

export default compose(
  forRoute('SUBMISSION'), //
  inject(mapStore), //
  loader, //
)(Submission)
