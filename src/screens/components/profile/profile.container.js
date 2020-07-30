import firebase from 'firebase/app'
import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'
import pick from 'lodash/pick'

import Profile from './profile'

const mapStore = (store) => {
  return {
    submitting: store.ui.loaders.get().isProfileSaving,
    setDefault: () => {
      const payload = pick(firebase.auth().currentUser, ['uid', 'email', 'displayName', 'photoURL'])
      store.dispatch({ type: '@@ui/SAVE_PROFILE', payload })
    },
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/SAVE_PROFILE', payload })
    },
  }
}

export default compose(
  forRoute(['speaker-profile', 'organizer-profile']), //
  inject(mapStore), //
)(Profile)
