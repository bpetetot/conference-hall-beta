import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import user from 'redux/data/user'
import Profile from './profile'

const mapState = (state) => {
  const {
    displayName, photoURL, email, ...profile
  } = user.get()(state)
  return {
    displayName,
    photoURL,
    email,
    form: 'user-profile',
    initialValues: profile,
  }
}

const mapDispatch = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_PROFILE_FORM', payload: data }),
})

export default forRoute('SPEAKER_PROFILE')(connect(mapState, mapDispatch)(Profile))
