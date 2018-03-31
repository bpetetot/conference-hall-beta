import { inject } from '@k-ramel/react'
import { compose } from 'redux'

import loader from 'components/loader'
import { isOrganizerRoute } from 'store/drivers/redux-little-router'
import Event from './event'

const mapStore = (store, props, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const event = store.data.events.get(eventId)
  return {
    loaded: !!event,
    isOrganizer: isOrganizerRoute(store.getState()),
    ...event,
    load: () => store.dispatch('@@ui/ON_LOAD_EVENT'),
  }
}

export default compose(inject(mapStore), loader)(Event)
