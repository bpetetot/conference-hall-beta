import { inject } from 'k-ramel/react'
import { compose } from 'redux'

import loader from 'components/loader'
import { getRouterParam, isOrganizerRoute } from 'store/reducers/router'
import Event from './event'

const mapStore = (store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const event = store.data.events.get(eventId)
  return {
    loaded: !!event,
    isOrganizer: isOrganizerRoute(store.getState()),
    ...event,
    load: () => store.dispatch({ type: 'ON_LOAD_EVENT_PAGE' }),
  }
}

export default compose(inject(mapStore), loader)(Event)
