import { inject } from '@k-ramel/react'

import ProposalFilters from './proposalFilters'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const sortOrders = router.getParam('sortOrders')
  const ratings = router.getParam('ratings')
  const statuses = router.getParam('statuses')
  const { deliberationActive, formats, categories } = store.data.events.get(eventId) || {}
  const filters = store.ui.organizer.proposals.get()
  return {
    statuses,
    ratings,
    formats,
    categories,
    sortOrders,
    filters,
    deliberationActive,
    onChange: ({ target }) => {
      store.ui.organizer.proposals.update({ [target.id]: target.value })
    },
  }
}

export default inject(mapStore)(ProposalFilters)
