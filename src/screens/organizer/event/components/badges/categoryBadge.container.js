import { inject } from '@k-ramel/react'

import { getCategory } from 'store/reducers/data/events.selector'
import Badge from 'components/badge'

const mapStore = (store, { eventId, categoryId }) => {
  const category = getCategory(eventId, categoryId)(store) || {}
  return { children: category.name }
}

export default inject(mapStore)(Badge)
