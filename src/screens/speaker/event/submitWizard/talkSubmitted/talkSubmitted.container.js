import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import TalkSubmitted from './talkSubmitted'

const mapStore = (store, { eventId }) => {
  const { surveyActive } = store.data.events.get(eventId) || {}
  return { surveyActive }
}

export default compose(inject(mapStore))(TalkSubmitted)
