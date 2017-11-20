import { connect } from 'react-redux'
import startsWith from 'lodash/startsWith'
import classnames from 'classnames'

const mapState = (state, { className }) => {
  const { pathname } = state.router
  return {
    className: classnames('default-theme', className, {
      'light-theme': startsWith(pathname, '/organizer'),
    }),
  }
}

export default connect(mapState)
