import { inject } from '@k-ramel/react'

import InputSearch from './inputSearch'

const mapStore = (store, props, { router }) => ({
  defaultValue: router.getParam('query'),
  onSearch: (query) => {
    router.push('search', null, { query })
    if (store.ui.search.events.isInitialized()) {
      store.dispatch('@@ui/SEARCH_EVENTS')
    }
  },
})

export default inject(mapStore)(InputSearch)
