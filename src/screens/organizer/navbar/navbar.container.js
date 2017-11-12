import { connect } from 'react-redux'

import { signout } from 'redux/auth'
import Navbar from './navbar'

const mapDispatch = dispatch => ({
  signout: () => dispatch(signout()),
})

export default connect(undefined, mapDispatch)(Navbar)
