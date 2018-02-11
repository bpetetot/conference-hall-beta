import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import { getRouterParam } from 'store/reducers/router'
import Submission from './submission'

const mapStore = (store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const event = store.data.events.get(eventId) || {}
  const { currentStep } = store.ui.speaker.submission.get()
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
