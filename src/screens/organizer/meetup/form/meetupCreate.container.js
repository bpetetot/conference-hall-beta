import { inject } from '@k-ramel/react'

import MeetupForm from './meetupForm'

const mapStore = (store, { date }) => ({
  submitting: store.ui.loaders.get().isMeetupSaving,
  onSubmit: payload => {
    store.dispatch({ type: '@@ui/ON_CREATE_MEETUP', payload: { ...payload, date } })
  },
})

export default inject(mapStore)(MeetupForm)
