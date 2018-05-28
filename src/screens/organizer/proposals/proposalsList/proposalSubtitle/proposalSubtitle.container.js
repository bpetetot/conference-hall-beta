import { inject } from '@k-ramel/react'

import { getFormat, getCategory } from 'store/reducers/data/events.selector'
import ProposalSubtitle from './proposalSubtitle'

const mapStore = (store, { eventId, proposal }) => {
  const { formats, categories } = proposal
  const category = getCategory(eventId, categories)(store) || {}
  const format = getFormat(eventId, formats)(store) || {}
  return {
    categoryLabel: category.name,
    formatLabel: format.name,
  }
}

export default inject(mapStore)(ProposalSubtitle)
