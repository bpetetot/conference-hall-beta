/* eslint-disable import/prefer-default-export */

export const setSearchEventsQuery = async (action, store) => {
  store.ui.searchEvents.update({ query: action.payload })
}

export const searchConferences = async (action, store, { router, algolia }) => {
  const query = router.getParam('query')

  store.ui.searchEvents.update({ loadingConferences: true })
  const conferences = await algolia.getIndex('conference').search({ query })

  store.ui.searchEvents.update({
    loadingConferences: false,
    conferences: conferences.hits,
    nbHitsConferences: conferences.nbHits,
  })
}

export const resetSearch = (action, store, { router }) => {
  store.ui.searchEvents.update({ query: undefined })
  store.dispatch('@@ui/SEARCH_CONFERENCES')
  router.push('search')
}
