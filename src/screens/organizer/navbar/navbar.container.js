import { connect } from 'react-redux'

import Navbar from './navbar'

const mapDispatch = dispatch => ({
  signout: () => dispatch({ type: 'SIGNOUT' }),
})

export default connect(undefined, mapDispatch)(Navbar)
