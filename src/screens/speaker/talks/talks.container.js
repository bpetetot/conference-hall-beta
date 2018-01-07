import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import speakerTalks from 'redux/ui/speaker/talks'
import LoadingIndicator from 'components/loading'
import Talks from './talks'

const mapState = state => ({
  loaded: speakerTalks.isInitialized(state),
  talks: speakerTalks.getKeys(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_SPEAKER_TALKS' }),
})

export default compose(
  forRoute('HOME_SPEAKER', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(Talks)
