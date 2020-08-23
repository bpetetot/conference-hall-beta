import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import ProposalFilters from './proposalsFilters'

const mapStore = (store, { eventId }) => {
  const { formats, categories } = store.data.events.get(eventId) || {}
  const settings = store.data.eventsSettings.get(eventId)

  return {
    eventId,
    formats,
    categories,
    hideRatings: get(settings, 'deliberation.hideRatings'),
    deliberationActive: get(settings, 'deliberation.enabled'),
  }
}

export default inject(mapStore)(ProposalFilters)
