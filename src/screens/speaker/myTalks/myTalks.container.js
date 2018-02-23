import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import MyTalks from './myTalks'

const mapStore = (store, props, { router }) => ({
  loaded: store.ui.speaker.myTalks.isInitialized(),
  talks: store.ui.speaker.myTalks.getAsArray(),
  load: () => store.dispatch('@@ui/ON_LOAD_SPEAKER_TALKS'),
  onSelect: id => router.push(`/speaker/talk/${id}`),
})

export default compose(
  forRoute.absolute('HOME_SPEAKER'), //
  inject(mapStore), //
  loader, //
)(MyTalks)
