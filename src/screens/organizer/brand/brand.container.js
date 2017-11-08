import { connect } from 'react-redux'
import startsWith from 'lodash/startsWith'

import Brand from './brand'

const mapState = (state) => {
  const { pathname } = state.router
  if (startsWith(pathname, '/organizer')) {
    return { currentApp: 'organizer', title: 'Organizer Hall' }
  }
  return { currentApp: 'home', title: 'Conference Hall' }
}

export default connect(mapState)(Brand)
