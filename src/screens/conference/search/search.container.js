import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'

import Search from './search'

const mapStore = store => ({
  loaded: !store.ui.searchEvents.get().loadingConferences,
  events: store.ui.searchEvents.get().conferences,
  load: () => {
    if (store.ui.searchEvents.isInitialized()) return
    store.dispatch('@@ui/SEARCH_CONFERENCES')
  },
  resetSearch: () => store.dispatch('@@ui/RESET_SEARCH'),
})

export default compose(
  forRoute.absolute('search'),
  inject(mapStore),
  loader,
)(Search)
