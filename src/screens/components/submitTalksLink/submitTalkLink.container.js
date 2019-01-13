import { inject } from '@k-ramel/react'

import { isCfpOpened } from 'store/reducers/data/events.selector'
import SubmitTalkLink from './submitTalkLink'

const mapStore = (store, { eventId, classNameActive }, { router }) => {
  const cfpOpened = isCfpOpened(eventId)(store)
  const isActive = router.getCurrentCode() === 'speaker-event-submit-wizard'
  return {
    eventId,
    displayed: eventId && cfpOpened,
    classNameActive: isActive ? classNameActive : undefined,
    onClick: () => store.dispatch({ type: '@@ui/GO_TO_SELECT_SUBMISSION', payload: { eventId } }),
  }
}

export default inject(mapStore)(SubmitTalkLink)
