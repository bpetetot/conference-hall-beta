import { inject } from '@k-ramel/react'

import SearchResults from './searchResults'

const mapStore = (store, { type }) => {
  const search = store.ui.search.events.get()

  if (type === 'conference') {
    return {
      total: search.totalConferences,
      results: search.conferences,
    }
  }
  return {
    total: search.totalMeetups,
    results: search.meetups,
  }
}

export default inject(mapStore)(SearchResults)
