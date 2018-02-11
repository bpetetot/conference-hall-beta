import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import { getUser } from 'redux/auth'
import Profile from './profile'

const mapStore = (store) => {
  const {
    displayName, photoURL, email, ...profile
  } = getUser(store)
  return {
    displayName,
    photoURL,
    email,
    form: 'user-profile',
    initialValues: profile,
    onSubmit: data => store.dispatch({ type: 'SUBMIT_PROFILE_FORM', payload: data }),
  }
}

export default forRoute('SPEAKER_PROFILE')(inject(mapStore)(Profile))
