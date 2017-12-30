import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import LoadingIndicator from 'components/loading'
import talks from 'redux/data/talks'
import Talks from './talks'

const mapState = state => ({
  loaded: talks.isInitialized(state),
  talks: talks.getKeys(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'MY_TALKS_SEARCH' }),
})

export default compose(
  forRoute('HOME_SPEAKER', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(Talks)
