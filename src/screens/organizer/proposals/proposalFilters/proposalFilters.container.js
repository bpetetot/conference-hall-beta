import { inject } from 'k-ramel/react'

import { getRouterParam } from 'redux/router'
import eventsData from 'redux/data/events'
import filtersUI from 'redux/ui/organizer/proposals/filters'
import ProposalFilters from './proposalFilters'

const mapStore = (store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const filters = filtersUI.get()(store.getState())
  const { formats, categories } = eventsData.get(eventId)(store.getState()) || {}
  return {
    formats,
    categories,
    filters,
    onChange: ({ target }) => store.dispatch(filtersUI.update({ [target.id]: target.value })),
  }
}

export default inject(mapStore)(ProposalFilters)
