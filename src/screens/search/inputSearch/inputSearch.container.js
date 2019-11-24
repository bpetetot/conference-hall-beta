import { inject } from '@k-ramel/react'

import InputSearch from './inputSearch'

const mapStore = store => ({
  defaultValue: store.ui.search.events.get().query,
  onSearch: query => {
    store.dispatch({ type: '@@ui/SEARCH_EVENTS', payload: { query } })
  },
})

export default inject(mapStore)(InputSearch)
