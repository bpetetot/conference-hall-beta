import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import { formatTimestamp } from 'helpers/firebase'
import { formatDate } from 'helpers/date'
import { getCfpState, getCfpOpeningDates } from 'store/reducers/data/events.selector'

import CfpBlock from './cfpBlock'

const mapStore = (store, { eventId }) => {
  const { type, cfpDates, deliberationDate, address } = store.data.events.get(eventId)

  const eventTimezone = get(address, 'timezone.id', 'Europe/Paris')
  const { start, end } = getCfpOpeningDates(cfpDates, eventTimezone) || {}

  return {
    cfpState: getCfpState(eventId)(store),
    type,
    start: start && formatDate(start.toJSDate(), 'large'),
    end: end && formatDate(end.toJSDate(), 'large'),
    deliberatiom: formatTimestamp(deliberationDate, 'large'),
  }
}

export default inject(mapStore)(CfpBlock)
