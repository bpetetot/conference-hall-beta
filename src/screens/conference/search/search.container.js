import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'

import Search from './search'

const mapStore = (store, props, { router }) => ({
  loaded: !store.ui.searchEvents.get().loadingConferences,
  query: router.getParam('query'),
  events: store.ui.searchEvents.get().conferences,
  load: () => store.dispatch('@@ui/SEARCH_CONFERENCES'),
})

export default compose(
  forRoute.absolute('search'),
  inject(mapStore),
  loader,
)(Search)
