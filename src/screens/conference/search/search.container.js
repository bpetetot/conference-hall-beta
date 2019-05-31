import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'

import Search from './search'

const mapStore = (store) => {
  const search = store.ui.search.events.get()
  return {
    loaded: !search.loading,
    totalConferences: search.totalConferences,
    conferences: search.conferences,
    totalMeetups: search.totalMeetups,
    meetups: search.meetups,
    load: () => {
      if (store.ui.search.events.isInitialized()) return
      store.dispatch('@@ui/SEARCH_EVENTS')
    },
    resetSearch: () => {
      store.ui.search.events.reset()
      store.dispatch('@@ui/SEARCH_EVENTS')
    },
  }
}

export default compose(
  forRoute.absolute('search'),
  inject(mapStore),
  loader,
)(Search)
