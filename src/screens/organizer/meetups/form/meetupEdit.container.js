import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import MeetupForm from './meetupForm'

const mapStore = (store, { id, onFinish }) => {
  const initialValues = store.data.meetups.get(id)
  if (initialValues.sessions) {
    initialValues.sessions = initialValues.sessions.map(session => session.proposalId)
  }
  return {
    initialValues,
    proposals: store.data.proposals.getAsArray(),
    submitting: store.ui.loaders.get().isMeetupSaving,
    onDelete: () => {
      store.dispatch({ type: '@@ui/ON_REMOVE_MEETUP', payload: { id } })
      onFinish()
    },
    onSubmit: payload => {
      store.dispatch({ type: '@@ui/ON_UPDATE_MEETUP', payload: { id, ...payload } })
      onFinish()
    },
  }
}

export default compose(
  inject(mapStore), //
)(MeetupForm)
