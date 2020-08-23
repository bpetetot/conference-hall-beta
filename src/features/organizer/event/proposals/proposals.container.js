import { compose } from 'redux'
import { inject, listen } from '@k-ramel/react'

import loader from 'components/loader'
import listeners from './proposals.listeners'
import Proposals from './proposals'

const mapStore = (store, { eventId }) => {
  const event = store.data.events.get(eventId)
  return {
    loaded: !!event,
    eventId,
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: eventId }),
  }
}

export default compose(inject(mapStore), listen(listeners, 'PROPOSALS'), loader)(Proposals)
