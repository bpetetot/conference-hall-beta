import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'

import { getRouterParam, isOrganizerRoute } from 'redux/router'
import eventsData from 'redux/data/events'
import LoadingIndicator from 'components/loading'
import Event from './event'

const mapState = (state) => {
  const eventId = getRouterParam('eventId')(state)
  const event = eventsData.get(eventId)(state)
  return {
    loaded: !!event,
    isOrganizer: isOrganizerRoute(state),
    ...event,
  }
}

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'ON_LOAD_EVENT_PAGE' }),
})

export default compose(
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(Event)
