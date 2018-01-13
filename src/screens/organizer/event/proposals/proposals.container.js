import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'redux-little-router'
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
  load: () => dispatch({ type: 'LOAD_EVENT_PROPOSALS_PAGE' }),
  onSelect: (eventId, talkId) => dispatch(push(`/organizer/event/${eventId}/proposal/${talkId}`)),
})

export default compose(
  forRoute('PROPOSALS', { absolute: true }), //
  connect(mapState, mapDispatch), //
  loader, //
)(Proposals)
