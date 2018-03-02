import { inject } from '@k-ramel/react'

import { getRouterParam, getRouterResult } from 'store/reducers/router'
import ProposalFilters from './proposalFilters'

const mapStore = (store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const { sortings } = getRouterResult(store.getState())
  const filters = store.ui.organizer.proposals.get()
  const { formats, categories } = store.data.events.get(eventId) || {}
  return {
    formats,
    categories,
    sortings,
    filters,
    onChange: ({ target }) => {
      store.ui.organizer.proposals.update({ [target.id]: target.value })
    },
  }
}

export default inject(mapStore)(ProposalFilters)
