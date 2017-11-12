import { connect } from 'react-redux'

import { signin } from 'redux/auth'

import Login from './login'

const mapState = state => ({
  nextUrl: state.router.query.next,
})

const mapDispatch = dispatch => ({
  signin: (provider, nextUrl) => dispatch(signin(provider, nextUrl)),
})

export default connect(mapState, mapDispatch)(Login)
