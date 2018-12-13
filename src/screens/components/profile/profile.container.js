import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import Profile from './profile'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  const user = store.data.users.get(uid)
  return {
    ...user,
    form: 'user-profile',
    initialValues: user,
    onSubmit: () => store.dispatch('@@ui/SAVE_PROFILE'),
  }
}

export default compose(
  forRoute('USER_PROFILE'), //
  inject(mapStore), //
)(Profile)
