import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import { push } from 'redux-little-router'
import forRoute from 'hoc-little-router'

import speakerTalks from 'redux/ui/speaker/myTalks'
import loader from 'components/loader'
import MyTalks from './myTalks'

const mapStore = store => ({
  loaded: speakerTalks.isInitialized(store.getState()),
  talks: speakerTalks.getAsArray(store.getState()),
  load: () => store.dispatch({ type: 'ON_LOAD_SPEAKER_TALKS' }),
  onSelect: id => store.dispatch(push(`/speaker/talk/${id}`)),
})

export default compose(
  forRoute.absolute('HOME_SPEAKER'), //
  inject(mapStore), //
  loader, //
)(MyTalks)
