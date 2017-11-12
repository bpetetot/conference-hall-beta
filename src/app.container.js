import { connect } from 'react-redux'
import startsWith from 'lodash/startsWith'
import classnames from 'classnames'

import App from './app'

const mapState = (state) => {
  const { pathname } = state.router
  return {
    theme: classnames('default-theme', {
      'red-theme': startsWith(pathname, '/organizer'),
    }),
  }
}

export default connect(mapState)(App)
