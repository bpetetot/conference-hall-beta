import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import MyTalks from './myTalks'

const mapStore = (store, props, { router }) => ({
  loaded: store.ui.speaker.myTalks.isInitialized(),
  talks: store.ui.speaker.myTalks.getAsArray(),
  load: () => store.dispatch('@@ui/ON_LOAD_SPEAKER_TALKS'),
  onSelect: talkId => router.push('speaker-talk-page', { talkId }),
})

export default compose(
  forRoute.absolute('speaker'),
  inject(mapStore),
  loader,
)(MyTalks)
