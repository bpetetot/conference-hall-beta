import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import { push } from 'redux-little-router'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import MyTalks from './myTalks'

const mapStore = store => ({
  loaded: store.ui.speaker.myTalks.isInitialized(),
  talks: store.ui.speaker.myTalks.getAsArray(),
  load: () => store.dispatch({ type: '@@ui/ON_LOAD_SPEAKER_TALKS' }),
  onSelect: id => store.dispatch(push(`/speaker/talk/${id}`)),
})

export default compose(
  forRoute.absolute('HOME_SPEAKER'), //
  inject(mapStore), //
  loader, //
)(MyTalks)
