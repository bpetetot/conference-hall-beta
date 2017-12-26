import { connect } from 'react-redux'
import { goBack } from 'redux-little-router'
import startsWith from 'lodash/startsWith'
import endsWith from 'lodash/endsWith'

import Brand from './brand'

const mapState = (state) => {
  const { pathname } = state.router
  const isOrganizer = startsWith(pathname, '/organizer')
  return {
    title: isOrganizer ? 'Organizer Hall' : 'Speaker Hall',
    app: isOrganizer ? 'organizer' : 'speaker',
    opened: endsWith(pathname, '/menu'),
  }
}

const mapDispatch = dispatch => ({
  goBack: () => dispatch(goBack()),
})

export default connect(mapState, mapDispatch)(Brand)
