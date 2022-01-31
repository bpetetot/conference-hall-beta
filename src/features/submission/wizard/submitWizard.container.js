import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import { isCfpOpen } from 'store/reducers/data/events.selector'
import SubmitWizard from './submitWizard'

const mapStore = (store, { eventId }) => {
  const event = store.data.events.get(eventId) || {}
  const { currentStep } = store.ui.speaker.submission.get()
  return {
    loaded: !!event,
    cfpOpen: isCfpOpen(event.id)(store),
    eventId: event.id,
    eventName: event.name,
    currentStep,
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: { eventId, loadSettings: false } })
    },
  }
}

export default compose(inject(mapStore), loader)(SubmitWizard)
