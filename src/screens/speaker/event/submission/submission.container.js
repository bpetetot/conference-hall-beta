import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import { isCfpOpened } from 'store/reducers/data/events.selector'
import Submission from './submission'

const mapStore = (store, props, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const event = store.data.events.get(eventId) || {}
  const { currentStep } = store.ui.speaker.submission.get()
  return {
    loaded: !!event,
    cfpOpened: isCfpOpened(event.id)(store),
    eventId: event.id,
    eventName: event.name,
    currentStep,
    load: () => store.dispatch('@@ui/ON_LOAD_EVENT'),
  }
}

export default compose(
  forRoute('EVENT_SUBMISSION'), //
  inject(mapStore), //
  loader, //
)(Submission)
