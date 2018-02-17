import { inject } from '@k-ramel/react'

import { getFormat } from 'store/reducers/data/events.selector'
import Badge from 'components/badge'

const mapStore = (store, { eventId, formatId }) => {
  const format = getFormat(eventId, formatId)(store) || {}
  return { children: format.name }
}

export default inject(mapStore)(Badge)
