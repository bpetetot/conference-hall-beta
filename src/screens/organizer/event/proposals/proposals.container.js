import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'redux/router'
import proposalsData from 'redux/data/proposals'
import loader from 'components/loader'
import Proposals from './proposals'

const mapState = state => ({
  eventId: getRouterParam('eventId')(state),
  loaded: proposalsData.isInitialized(state),
  proposals: proposalsData.getAsArray(state),
})

const mapDispatch = dispatch => ({
  load: () => {
    dispatch({ type: 'LOAD_EVENT_PROPOSALS_PAGE' })
  },
  onSelect: (eventId, proposalId) => {
    dispatch({ type: 'SELECT_PROPOSAL', payload: { eventId, proposalId } })
  },
})

export default compose(
  forRoute.absolute('PROPOSALS'), //
  connect(mapState, mapDispatch), //
  loader, //
)(Proposals)
