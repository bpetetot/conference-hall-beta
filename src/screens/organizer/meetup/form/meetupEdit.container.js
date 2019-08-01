import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import MeetupForm from './meetupForm'

const mapStore = (store, { id }) => {
  const initialValues = store.data.meetups.get(id)
  return {
    initialValues,
    submitting: store.ui.loaders.get().isMeetupSaving,
    onDelete: () => {
      store.dispatch({ type: '@@ui/ON_REMOVE_MEETUP', id })
    },
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/ON_UPDATE_MEETUP', payload: { ...payload } })
    },
  }
}

export default compose(
  inject(mapStore), //
)(MeetupForm)
