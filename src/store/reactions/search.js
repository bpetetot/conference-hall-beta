/* eslint-disable import/prefer-default-export */
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
  router.push('search')
  store.dispatch('@@ui/SEARCH_CONFERENCES')
}
