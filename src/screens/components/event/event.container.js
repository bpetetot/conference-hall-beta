import { inject } from '@k-ramel/react'
import { compose } from 'redux'

import loader from 'components/loader'
import Event from './event'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const event = store.data.events.get(eventId)
  return {
    loaded: !!event,
    isOrganizer: router.getParam('root') === 'organizer',
    ...event,
    load: () => store.dispatch('@@ui/ON_LOAD_EVENT'),
  }
}

export default compose(inject(mapStore), loader)(Event)
