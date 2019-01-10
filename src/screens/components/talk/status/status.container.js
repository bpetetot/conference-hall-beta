import { inject } from '@k-ramel/react'

import { isCfpOpened } from 'store/reducers/data/events.selector'
import {
  isRejected,
  isAccepted,
  isSubmitted,
  isConfirmed,
  isDeclined,
  isOutOfDateForEvent,
} from 'store/reducers/data/talks.selector'
import Status from './status'

const mapStore = (store, { talkId, eventId }) => ({
  loaded: !!store.data.events.get(eventId),
  cfpOpened: isCfpOpened(eventId)(store),
  submitted: isSubmitted(talkId, eventId)(store),
  confirmed: isConfirmed(talkId, eventId)(store),
  accepted: isAccepted(talkId, eventId)(store),
  rejected: isRejected(talkId, eventId)(store),
  declined: isDeclined(talkId, eventId)(store),
  outOfDate: isOutOfDateForEvent(talkId, eventId)(store),
})

export default inject(mapStore)(Status)
