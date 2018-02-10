import { inject } from 'k-ramel/react'

import { isSubmitted } from 'redux/data/talks'
import TalkCardInfo from './talkCardInfo'

const mapStore = (store, { talkId, eventId }) => ({
  submitted: isSubmitted(talkId, eventId)(store.getState()),
})

export default inject(mapStore)(TalkCardInfo)
