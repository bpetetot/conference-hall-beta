import { connect } from 'react-redux'

import user from 'redux/data/user'
import AvatarDropdown from './avatarDropdown'

const mapState = state => ({
  fullname: user.get()(state).displayName,
  image: user.get()(state).photoURL,
})

const mapDispatch = dispatch => ({
  signout: () => dispatch({ type: 'SIGN_OUT' }),
})

export default connect(mapState, mapDispatch)(AvatarDropdown)
