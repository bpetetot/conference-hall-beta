import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import Profile from './profile'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  const {
    displayName, photoURL, email, ...profile
  } = store.data.users.get(uid) || {}
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
