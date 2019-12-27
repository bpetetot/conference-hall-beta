import { inject } from '@k-ramel/react'

import MeetupForm from './meetupForm'

const mapStore = (store, { date, onFinish }) => ({
  proposals: store.data.proposals.getAsArray(),
  submitting: store.ui.loaders.get().isMeetupSaving,
  onSubmit: payload => {
    store.dispatch({ type: '@@ui/ON_CREATE_MEETUP', payload: { ...payload, date } })
    onFinish()
  },
})

export default inject(mapStore)(MeetupForm)
