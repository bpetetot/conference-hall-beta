import { compose } from 'redux'
import { inject, listen } from '@k-ramel/react'

import SearchEvent from './searchEvent'
import listeners from './searchEvent.listener'

const mapStore = (store, props, { router }) => ({
  value: store.ui.searchEvents.get().query,
  onChange: (e) => {
    store.dispatch({ type: '@@ui/ON_CHANGE_SEARCH_EVENTS_QUERY', payload: e.target.value })
  },
  onClick: () => {
    const { query } = store.ui.searchEvents.get()
    router.push('events', null, { query })
  },
})

export default compose(
  listen(listeners, 'PROPOSALS'),
  inject(mapStore),
)(SearchEvent)
