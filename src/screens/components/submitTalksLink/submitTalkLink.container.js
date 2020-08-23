import { inject } from '@k-ramel/react'

import { isCfpOpened } from 'store/reducers/data/events.selector'
import SubmitTalkLink from './submitTalkLink'

const mapStore = (store, { eventId }) => {
  return {
    displayed: eventId && isCfpOpened(eventId)(store),
    onClick: () => store.ui.speaker.submission.reset(),
  }
}

export default inject(mapStore)(SubmitTalkLink)
