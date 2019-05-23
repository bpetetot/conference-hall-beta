import { inject } from '@k-ramel/react'

import SearchEvent from './searchEvent'

const mapStore = (store, props, { router }) => ({
  value: store.ui.searchEvents.get().query,
  onChange: (e) => {
    store.dispatch({ type: '@@ui/ON_CHANGE_SEARCH_EVENTS_QUERY', payload: e.target.value })
  },
  onClick: () => {
    const { query } = store.ui.searchEvents.get()
    router.push('search', null, { query })
  },
})

export default inject(mapStore)(SearchEvent)
