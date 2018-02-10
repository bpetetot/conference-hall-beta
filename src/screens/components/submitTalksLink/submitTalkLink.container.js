import { inject } from 'k-ramel/react'

import { isCfpOpened } from 'redux/data/events'
import SubmitTalkLink from './submitTalkLink'

const mapStore = (store, { eventId }) => {
  const cfpOpened = isCfpOpened(eventId)(store.getState())
  return {
    eventId,
    displayed: eventId && cfpOpened,
    onClick: () => store.dispatch({ type: 'OPEN_SUBMISSION_SELECTION_PAGE', payload: { eventId } }),
  }
}

export default inject(mapStore)(SubmitTalkLink)
