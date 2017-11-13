import { connect } from 'react-redux'

import Login from './login'

const mapState = state => ({
  nextUrl: state.router.query.next,
})

const mapDispatch = dispatch => ({
  signin: (provider, nextUrl) => dispatch({ type: 'SIGN_IN', payload: { provider, nextUrl } }),
})

export default connect(mapState, mapDispatch)(Login)
