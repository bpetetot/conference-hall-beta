import { connect } from 'react-redux'

import { getUser } from 'redux/auth'
import AvatarDropdown from './avatarDropdown'

const mapState = (state) => {
  const { displayName, photoURL } = getUser(state)
  return { displayName, photoURL }
}

const mapDispatch = dispatch => ({
  signout: () => dispatch({ type: 'SIGN_OUT' }),
})

export default connect(mapState, mapDispatch)(AvatarDropdown)
