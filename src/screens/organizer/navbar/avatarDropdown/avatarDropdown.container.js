import { connect } from 'react-redux'

import { getUser, signout } from 'redux/auth'
import AvatarDropdown from './avatarDropdown'

const mapState = state => ({
  fullname: getUser(state).displayName,
  image: getUser(state).photoURL,
})

const mapDispatch = dispatch => ({
  signout: () => dispatch(signout()),
})

export default connect(mapState, mapDispatch)(AvatarDropdown)
