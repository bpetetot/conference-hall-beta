import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import { isCfpOpened } from 'store/reducers/data/events.selector'
import SubmitWizard from './submitWizard'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
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
  forRoute('speaker-event-submit-wizard'),
  inject(mapStore),
  loader,
)(SubmitWizard)
