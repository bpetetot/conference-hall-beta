/* eslint-disable import/prefer-default-export */
export const searchEvents = async (action, store, { router, algolia }) => {
  router.push('search')

  store.ui.search.events.update({ loading: true, ...action.payload })

  const { query } = store.ui.search.events.get()

  const conferences = await algolia.getIndex('conference').search({ query })
  const meetups = await algolia.getIndex('meetup').search({ query })

  store.ui.search.events.update({
    loading: false,
    totalConferences: conferences.nbHits,
    conferences: conferences.hits,
    totalMeetups: meetups.nbHits,
    meetups: meetups.hits,
  })
}
