import { connect } from 'react-redux'
import { goBack } from 'redux-little-router'
import { isOrganizerRoute, isMobileMenuRoute } from 'redux/routes'

import Brand from './brand'

const mapState = state => ({
  title: isOrganizerRoute(state) ? 'Organizer Hall' : 'Speaker Hall',
  app: isOrganizerRoute(state) ? 'organizer' : 'speaker',
  opened: isMobileMenuRoute(state),
})

const mapDispatch = dispatch => ({
  goBack: () => dispatch(goBack()),
})

export default connect(mapState, mapDispatch)(Brand)
