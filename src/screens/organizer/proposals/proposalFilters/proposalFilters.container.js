import { inject } from '@k-ramel/react'

import ProposalFilters from './proposalFilters'

const mapStore = (store, props, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const sortOrders = router.getParentResultParam('sortOrders')
  const ratings = router.getParentResultParam('ratings')
  const filters = store.ui.organizer.proposals.get()
  const { formats, categories } = store.data.events.get(eventId) || {}
  return {
    ratings,
    formats,
    categories,
    sortOrders,
    filters,
    onChange: ({ target }) => {
      store.ui.organizer.proposals.update({ [target.id]: target.value })
    },
  }
}

export default inject(mapStore)(ProposalFilters)
