import { inject } from '@k-ramel/react'

import { isCfpOpen } from 'store/reducers/data/events.selector'
import SubmitTalkLink from './submitTalkLink'

const mapStore = (store, { eventId }) => {
  return {
    displayed: eventId && isCfpOpen(eventId)(store),
    onClick: () => store.ui.speaker.submission.reset(),
  }
}

export default inject(mapStore)(SubmitTalkLink)
