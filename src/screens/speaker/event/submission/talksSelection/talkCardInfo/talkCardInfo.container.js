import { inject } from '@k-ramel/react'

import { isSubmitted } from 'store/reducers/data/talks.selector'
import TalkCardInfo from './talkCardInfo'

const mapStore = (store, { talkId, eventId }) => ({
  submitted: isSubmitted(talkId, eventId)(store),
})

export default inject(mapStore)(TalkCardInfo)
