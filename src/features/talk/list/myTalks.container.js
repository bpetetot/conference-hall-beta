import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import MyTalks from './myTalks'

const mapStore = (store, { userId }) => ({
  loaded: store.ui.speaker.myTalks.isInitialized(),
  talks: store.ui.speaker.myTalks.getAsArray(),
  load: () => store.dispatch({ type: '@@ui/ON_LOAD_SPEAKER_TALKS', payload: { userId } }),
})

export default compose(inject(mapStore), loader)(MyTalks)
