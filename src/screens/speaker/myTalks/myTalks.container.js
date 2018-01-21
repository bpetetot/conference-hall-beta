import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'redux-little-router'
import forRoute from 'hoc-little-router'

import speakerTalks from 'redux/ui/speaker/myTalks'
import loader from 'components/loader'
import MyTalks from './myTalks'

const mapState = state => ({
  loaded: speakerTalks.isInitialized(state),
  talks: speakerTalks.getAsArray(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'ON_LOAD_SPEAKER_TALKS' }),
  onSelect: id => dispatch(push(`/speaker/talk/${id}`)),
})

export default compose(
  forRoute.absolute('HOME_SPEAKER'), //
  connect(mapState, mapDispatch), //
  loader, //
)(MyTalks)
