import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import Profile from './profile'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  const user = store.data.users.get(uid)
  return {
    ...user,
    initialValues: user,
    submitting: store.ui.loaders.get().isProfileSaving,
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/SAVE_PROFILE', payload })
    },
  }
}

export default compose(
  forRoute(['speaker-profile', 'organizer-profile']), //
  inject(mapStore), //
)(Profile)
