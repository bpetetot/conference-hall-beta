import { connect } from 'react-redux'
import startsWith from 'lodash/startsWith'

import Brand from './brand'

const mapState = (state) => {
  const { pathname } = state.router
  if (startsWith(pathname, '/organizer')) {
    return { title: 'Organizer Hall', path: '/organizer' }
  }
  return { title: 'Conference Hall', path: '/' }
}

export default connect(mapState)(Brand)
