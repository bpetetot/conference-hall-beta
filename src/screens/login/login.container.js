import { connect } from 'react-redux'

import withRoute from 'components/withRoute'
import Login from './login'

const mapDispatch = dispatch => ({
  signin: provider => dispatch({ type: 'SIGN_IN', payload: provider }),
})

export default withRoute(connect(undefined, mapDispatch)(Login))
