import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import parse from 'date-fns/parse'

import MeetupForm from './meetupForm'

const mapStore = (store, { date }) => ({
  submitting: store.ui.loaders.get().isMeetupSaving,
  onSubmit: (payload) => {
    store.dispatch({ type: '@@ui/ON_CREATE_MEETUP', payload: { ...payload, date: parse(date) } })
  },
})

export default compose(
  inject(mapStore), //
)(MeetupForm)