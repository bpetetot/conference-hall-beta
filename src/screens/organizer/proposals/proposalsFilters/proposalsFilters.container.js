import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import ProposalFilters from './proposalsFilters'

const filterSortOrders = (sortOrders, hideRatings) => {
  return sortOrders.filter((order) => !(/Rating/gm.test(order) && hideRatings))
}

const mapStore = (store, { userId }, { router }) => {
  const eventId = router.getParam('eventId')
  const sortOrders = router.getParam('sortOrders')
  const ratings = router.getParam('ratings')
  const statuses = router.getParam('statuses')
  const { formats, categories } = store.data.events.get(eventId) || {}
  const settings = store.data.eventsSettings.get(eventId)
  const filters = store.ui.organizer.proposals.get()
  const hideRatings = get(settings, 'deliberation.hideRatings')

  return {
    eventId,
    statuses,
    ratings,
    formats,
    categories,
    filters,
    sortOrders: filterSortOrders(sortOrders, hideRatings),
    deliberationActive: get(settings, 'deliberation.enabled'),
    onChange: (event) => {
      store.dispatch({
        type: '@@ui/CHANGE_PROPOSAL_FILTER',
        payload: { userId, key: event.target.id, value: event.target.value },
      })
    },
  }
}

export default inject(mapStore)(ProposalFilters)
