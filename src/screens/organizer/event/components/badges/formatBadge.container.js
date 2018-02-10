import { inject } from 'k-ramel/react'

import { getFormat } from 'redux/data/events'
import Badge from 'components/badge'

const mapStore = (store, { eventId, formatId }) => {
  const format = getFormat(eventId, formatId)(store.getState()) || {}
  return { children: format.name }
}

export default inject(mapStore)(Badge)
