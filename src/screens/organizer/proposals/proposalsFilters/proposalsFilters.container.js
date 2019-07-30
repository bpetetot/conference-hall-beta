import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import ProposalFilters from './proposalsFilters'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const sortOrders = router.getParam('sortOrders')
  const ratings = router.getParam('ratings')
  const statuses = router.getParam('statuses')
  const { formats, categories } = store.data.events.get(eventId) || {}
  const settings = store.data.eventsSettings.get(eventId)
  const filters = store.ui.organizer.proposals.get()

  return {
    statuses,
    ratings,
    formats,
    categories,
    sortOrders,
    filters,
    deliberationActive: get(settings, 'deliberation.enabled'),
    onChange: ({ target }) => {
      store.ui.organizer.proposals.update({ [target.id]: target.value })
    },
  }
}

export default inject(mapStore)(ProposalFilters)
