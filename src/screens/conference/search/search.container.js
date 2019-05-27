import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import getMyEvents from 'store/reducers/ui/speaker/myEvents.selector'

import Search from './search'

const mapStore = (store, props, { router }) => ({
  loaded: store.ui.speaker.myEvents.isInitialized(),
  query: router.getParam('query'),
  events: getMyEvents(store),
  load: () => store.dispatch('@@ui/ON_LOAD_SPEAKER_EVENTS'),
})

export default compose(
  forRoute.absolute('search'),
  inject(mapStore),
  loader,
)(Search)
