import { inject } from 'k-ramel/react'

import { isCfpOpened } from 'store/reducers/data/events.selector'
import SubmitTalkLink from './submitTalkLink'

const mapStore = (store, { eventId }) => {
  const cfpOpened = isCfpOpened(eventId)(store)
  return {
    eventId,
    displayed: eventId && cfpOpened,
    onClick: () => store.dispatch({ type: '@@ui/GO_TO_SELECT_SUBMISSION', payload: { eventId } }),
  }
}

export default inject(mapStore)(SubmitTalkLink)
