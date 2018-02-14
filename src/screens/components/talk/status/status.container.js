import { inject } from 'k-ramel/react'

import { isSubmitted, isOutOfDateForEvent } from 'store/reducers/data/talks.selector'
import Status from './status'

const mapStore = (store, { talkId, eventId }) => ({
  submitted: isSubmitted(talkId, eventId)(store),
  outOfDate: isOutOfDateForEvent(talkId, eventId)(store),
})

export default inject(mapStore)(Status)
