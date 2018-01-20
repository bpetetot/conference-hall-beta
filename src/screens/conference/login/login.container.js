import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import { isAuthenticated } from 'redux/auth'
import Login from './login'

const mapState = state => ({
  authenticated: isAuthenticated(state),
})

const mapDispatch = dispatch => ({
  signin: provider => dispatch({ type: 'SIGN_IN', payload: provider }),
})

export default compose(
  forRoute.absolute('LOGIN'), //
  connect(mapState, mapDispatch), //
)(Login)
