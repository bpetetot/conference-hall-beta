import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import Login from './login'

const mapDispatch = dispatch => ({
  signin: provider => dispatch({ type: 'SIGN_IN', payload: provider }),
})

export default compose(forRoute('LOGIN', { absolute: true }), connect(undefined, mapDispatch))(Login)
