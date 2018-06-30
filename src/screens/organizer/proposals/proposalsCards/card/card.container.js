import { inject } from '@k-ramel/react'

import { getFormat, getCategory } from 'store/reducers/data/events.selector'
import ProposalCard from './card'

const mapStore = (store, { eventId, formats, categories }) => {
  const category = getCategory(eventId, categories)(store) || {}
  const format = getFormat(eventId, formats)(store) || {}
  return {
    categoryLabel: category.name,
    formatLabel: format.name,
  }
}

export default inject(mapStore)(ProposalCard)
