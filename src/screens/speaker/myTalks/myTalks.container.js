import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'redux-little-router'
import forRoute from 'hoc-little-router'
import loader from 'hoc-react-loader/build/core'
import speakerTalks from 'redux/ui/speaker/myTalks'
import LoadingIndicator from 'components/loading'
import MyTalks from './myTalks'

const mapState = state => ({
  loaded: speakerTalks.isInitialized(state),
  talks: speakerTalks.getAsArray(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_SPEAKER_TALKS' }),
  onSelect: id => dispatch(push(`/speaker/talk/${id}`)),
})

export default compose(
  forRoute('HOME_SPEAKER', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(MyTalks)
