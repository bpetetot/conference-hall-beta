import { inject } from '@k-ramel/react'

import SearchFilters from './searchFilters'

const mapStore = (store) => ({
  defaultLocation: store.ui.search.events.get().location,
  defaultDate: store.ui.search.events.get().date,
  onFilter: (filters) => {
    store.dispatch({ type: '@@ui/SEARCH_EVENTS', payload: filters })
  },
  onReset: () => store.dispatch('@@ui/RESET_SEARCH'),
})

export default inject(mapStore)(SearchFilters)
