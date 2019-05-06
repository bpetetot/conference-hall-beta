import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'
import parse from 'date-fns/parse'

import MeetupForm from './meetupForm'

const mapStore = (store, props, { router }) => {
  const { date } = router.getQueryParams()
  return {
    submitting: store.ui.loaders.get().isMeetupSaving,
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/ON_CREATE_MEETUP', payload: { ...payload, date: parse(date) } })
    },
  }
}

export default compose(
  forRoute.absolute('organizer-create-meetup'), //
  inject(mapStore), //
)(MeetupForm)
