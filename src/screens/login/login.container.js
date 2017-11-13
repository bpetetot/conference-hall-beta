import { connect } from 'react-redux'

import Login from './login'

const mapDispatch = dispatch => ({
  signin: provider => dispatch({ type: 'SIGN_IN', payload: provider }),
})

export default connect(undefined, mapDispatch)(Login)
