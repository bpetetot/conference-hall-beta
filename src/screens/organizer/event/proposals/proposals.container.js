import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import proposalsData from 'redux/data/proposals'
import LoadingIndicator from 'components/loading'
import Proposals from './proposals'

const mapState = state => ({
  loaded: proposalsData.isInitialized(state),
  proposals: proposalsData.getKeys(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'LOAD_EVENT_PROPOSALS_PAGE' }),
})

export default compose(
  forRoute('PROPOSALS', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(Proposals)
