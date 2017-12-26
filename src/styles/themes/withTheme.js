import { connect } from 'react-redux'
import startsWith from 'lodash/startsWith'
import classnames from 'classnames'

const mapState = (state, { className }) => {
  const { pathname } = state.router
  return {
    className: classnames('default-theme', className, {
      'red-theme': startsWith(pathname, '/organizer'),
      'blue-theme': startsWith(pathname, '/speaker'),
    }),
  }
}

export default connect(mapState)
