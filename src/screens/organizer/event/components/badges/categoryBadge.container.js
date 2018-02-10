import { inject } from 'k-ramel/react'

import { getCategory } from 'redux/data/events'
import Badge from 'components/badge'

const mapStore = (store, { eventId, categoryId }) => {
  const category = getCategory(eventId, categoryId)(store.getState()) || {}
  return { children: category.name }
}

export default inject(mapStore)(Badge)
