import { inject } from '@k-ramel/react'

import NoResult from './noResult'

const mapStore = store => ({
  resetSearch: () => {
    store.ui.search.events.reset()
    store.dispatch('@@ui/SEARCH_EVENTS')
  },
})

export default inject(mapStore)(NoResult)
