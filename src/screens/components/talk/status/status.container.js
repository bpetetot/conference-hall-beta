import { inject } from 'k-ramel/react'

import { isSubmitted, isOutOfDateForEvent } from 'store/reducers/data/talks.selector'
import Status from './status'

const mapStore = (store, { talkId, eventId }) => ({
  submitted: isSubmitted(talkId, eventId)(store),
  outOfDate: isOutOfDateForEvent(talkId, eventId)(store),
  onClickEdit: () => {
    store.dispatch({ type: '@@ui/GO_TO_EVENT_SUBMISSION', payload: { eventId, talkId } })
  },
})

export default inject(mapStore)(Status)
