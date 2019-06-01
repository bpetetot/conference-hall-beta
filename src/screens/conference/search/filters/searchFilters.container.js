import { inject } from '@k-ramel/react'

import SearchFilters from './searchFilters'

const mapStore = store => ({
  defaultLocation: store.ui.search.events.get().location,
  defaultDate: store.ui.search.events.get().date,
  onFilter: (filters) => {
    store.dispatch({ type: '@@ui/SEARCH_EVENTS', payload: filters })
  },
})

export default inject(mapStore)(SearchFilters)
