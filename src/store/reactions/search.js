/* eslint-disable import/prefer-default-export */

export const setSearchEventsQuery = async (action, store) => {
  store.ui.searchEvents.update({ query: action.payload })
}

export const searchConferences = async (action, store, { router, algolia }) => {
  const query = router.getParam('query')

  store.ui.searchEvents.update({ loadingConferences: true })
  const conferences = await algolia.getIndex('conference').search({ query })
  console.log(conferences)
  store.ui.searchEvents.update({
    loadingConferences: false,
    conferences: conferences.hits,
    nbHitsConferences: conferences.nbHits,
  })
}
