import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import MyTalks from './myTalks'

const mapStore = (store, { userId }, { router }) => ({
  loaded: store.ui.speaker.myTalks.isInitialized(),
  talks: store.ui.speaker.myTalks.getAsArray(),
  load: () => store.dispatch({ type: '@@ui/ON_LOAD_SPEAKER_TALKS', payload: { userId } }),
  onSelect: (talkId) => router.push('speaker-talk-page', { talkId }),
})

export default compose(inject(mapStore), loader)(MyTalks)
